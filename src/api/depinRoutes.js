/** @import { RequestWithDepin } from './typings.js' */
/** @import { FastifyInstance, FastifyReply } from 'fastify' */

import { today } from './utils/date.js'

const depinRoutesDefaultParamsSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    depin: {
      type: 'string',
      pattern: '^(walrus|helium|akash)$'
    }
  },
  required: ['depin']
}

/**
 * Define the DePIN network routes
 * @param {FastifyInstance} app
 */
export const depinRoutes = (app) => {
  // Record node performance metrics
  app.post(
    '/:depin/node-metrics',
    {
      schema: {
        params: depinRoutesDefaultParamsSchema,
        body: {
          type: 'object',
          properties: {
            nodeId: { type: 'string' },
            uptime: { type: 'number', minimum: 0, maximum: 100 },
            status: { type: 'string', enum: ['active', 'inactive', 'online', 'offline'] },
            location: {
              type: 'object',
              properties: {
                lat: { type: 'number' },
                lng: { type: 'number' },
                region: { type: 'string' }
              },
              required: ['lat', 'lng']
            },
            lastSeen: { type: 'string', format: 'date-time' },
            // Helium specific
            rewards: { type: 'number' },
            // Akash specific
            deployments: { type: 'integer' },
            resources: {
              type: 'object',
              properties: {
                cpu: { type: 'integer' },
                memory: { type: 'integer' },
                storage: { type: 'integer' }
              }
            }
          },
          required: ['nodeId', 'uptime', 'status', 'location', 'lastSeen']
        }
      }
    },
    /**
     * @param {RequestWithDepin<NodeMetricsBody>} request
     * @param {FastifyReply} reply
     */
    async (request, reply) => {
      const client = await app.pg.connect()
      try {
        // Store node metrics in database
        await client.query(
          `INSERT INTO node_metrics (
            depin, node_id, uptime, status, lat, lng, region, last_seen, 
            rewards, deployments, cpu, memory, storage, recorded_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())`,
          [
            request.params.depin,
            request.body.nodeId,
            request.body.uptime,
            request.body.status,
            request.body.location.lat,
            request.body.location.lng,
            request.body.location.region || null,
            request.body.lastSeen,
            request.body.rewards || null,
            request.body.deployments || null,
            request.body.resources?.cpu || null,
            request.body.resources?.memory || null,
            request.body.resources?.storage || null
          ]
        )
        
        // Store data on Filecoin (simulated)
        await storeOnFilecoin(request.params.depin, request.body)
        
        reply.code(201).send({ success: true })
      } catch (error) {
        app.log.error(error)
        reply.code(500).send({ error: 'Failed to store node metrics' })
      } finally {
        client.release()
      }
    }
  )

  // Get node metrics for a specific DePIN network
  app.get(
    '/:depin/node-metrics',
    {
      schema: {
        params: depinRoutesDefaultParamsSchema,
        querystring: {
          type: 'object',
          properties: {
            from: { type: 'string', format: 'date-time' },
            to: { type: 'string', format: 'date-time' },
            limit: { type: 'integer', minimum: 1, maximum: 100, default: 20 },
            offset: { type: 'integer', minimum: 0, default: 0 }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              nodes: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    status: { type: 'string' },
                    uptime: { type: 'number' },
                    location: {
                      type: 'object',
                      properties: {
                        lat: { type: 'number' },
                        lng: { type: 'number' },
                        region: { type: 'string' }
                      }
                    },
                    lastSeen: { type: 'string', format: 'date-time' },
                    rewards: { type: 'number' },
                    deployments: { type: 'integer' },
                    resources: {
                      type: 'object',
                      properties: {
                        cpu: { type: 'integer' },
                        memory: { type: 'integer' },
                        storage: { type: 'integer' }
                      }
                    }
                  }
                }
              },
              stats: {
                type: 'object',
                properties: {
                  totalNodes: { type: 'integer' },
                  activeNodes: { type: 'integer' },
                  averageUptime: { type: 'number' },
                  totalRewards: { type: 'number' },
                  totalDeployments: { type: 'integer' }
                }
              },
              pagination: {
                type: 'object',
                properties: {
                  total: { type: 'integer' },
                  limit: { type: 'integer' },
                  offset: { type: 'integer' }
                }
              }
            }
          }
        }
      }
    },
    /**
     * @param {RequestWithDepin<{}, QueryParams>} request
     * @param {FastifyReply} reply
     */
    async (request, reply) => {
      const client = await app.pg.connect()
      const from = request.query.from || new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      const to = request.query.to || new Date().toISOString()
      const limit = request.query.limit || 20
      const offset = request.query.offset || 0
      
      try {
        // Get node metrics
        const { rows: nodeRows } = await client.query(
          `SELECT 
            node_id, 
            uptime, 
            status, 
            lat, 
            lng, 
            region, 
            last_seen, 
            rewards, 
            deployments, 
            cpu, 
            memory, 
            storage
          FROM node_metrics
          WHERE depin = $1 
            AND recorded_at >= $2 
            AND recorded_at <= $3
          ORDER BY recorded_at DESC
          LIMIT $4 OFFSET $5`,
          [request.params.depin, from, to, limit, offset]
        )
        
        // Get stats
        const { rows: statRows } = await client.query(
          `SELECT 
            COUNT(DISTINCT node_id) as total_nodes,
            COUNT(DISTINCT node_id) FILTER (WHERE status IN ('active', 'online')) as active_nodes,
            AVG(uptime) as average_uptime,
            SUM(rewards) as total_rewards,
            SUM(deployments) as total_deployments
          FROM node_metrics
          WHERE depin = $1 
            AND recorded_at >= $2 
            AND recorded_at <= $3`,
          [request.params.depin, from, to]
        )
        
        // Get total count for pagination
        const { rows: countRows } = await client.query(
          `SELECT COUNT(DISTINCT node_id) as total
          FROM node_metrics
          WHERE depin = $1 
            AND recorded_at >= $2 
            AND recorded_at <= $3`,
          [request.params.depin, from, to]
        )
        
        // Format response
        const nodes = nodeRows.map(row => ({
          id: row.node_id,
          name: `${request.params.depin.charAt(0).toUpperCase() + request.params.depin.slice(1)} Node ${row.node_id.substring(0, 8)}`,
          status: row.status,
          uptime: row.uptime,
          location: {
            lat: row.lat,
            lng: row.lng,
            region: row.region
          },
          lastSeen: row.last_seen,
          ...(row.rewards !== null && { rewards: row.rewards }),
          ...(row.deployments !== null && { deployments: row.deployments }),
          ...(row.cpu !== null && {
            resources: {
              cpu: row.cpu,
              memory: row.memory,
              storage: row.storage
            }
          })
        }))
        
        reply.send({
          nodes,
          stats: {
            totalNodes: parseInt(statRows[0].total_nodes),
            activeNodes: parseInt(statRows[0].active_nodes),
            averageUptime: parseFloat(statRows[0].average_uptime),
            totalRewards: parseFloat(statRows[0].total_rewards || 0),
            totalDeployments: parseInt(statRows[0].total_deployments || 0)
          },
          pagination: {
            total: parseInt(countRows[0].total),
            limit,
            offset
          }
        })
      } finally {
        client.release()
      }
    }
  )

  // Get comparison data across all DePIN networks
  app.get(
    '/compare',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            from: { type: 'string', format: 'date-time' },
            to: { type: 'string', format: 'date-time' }
          }
        },
        response: {
          200: {
            type: 'object',
            properties: {
              networks: { 
                type: 'array',
                items: { type: 'string' }
              },
              totalNodes: { 
                type: 'array',
                items: { type: 'integer' }
              },
              activeNodes: { 
                type: 'array',
                items: { type: 'integer' }
              },
              uptime: { 
                type: 'array',
                items: { type: 'number' }
              },
              regionDistribution: {
                type: 'object',
                properties: {
                  labels: { 
                    type: 'array',
                    items: { type: 'string' }
                  },
                  data: { 
                    type: 'array',
                    items: { 
                      type: 'array',
                      items: { type: 'integer' }
                    }
                  }
                }
              },
              growthData: {
                type: 'object',
                properties: {
                  labels: { 
                    type: 'array',
                    items: { type: 'string' }
                  },
                  datasets: { 
                    type: 'array',
                    items: { 
                      type: 'object',
                      properties: {
                        label: { type: 'string' },
                        data: { 
                          type: 'array',
                          items: { type: 'integer' }
                        },
                        borderColor: { type: 'string' },
                        backgroundColor: { type: 'string' }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    /**
     * @param {RequestWithDepin<{}, QueryParams>} request
     * @param {FastifyReply} reply
     */
    async (request, reply) => {
      const client = await app.pg.connect()
      const from = request.query.from || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      const to = request.query.to || new Date().toISOString()
      
      try {
        // Get basic stats for each network
        const { rows: statsRows } = await client.query(
          `SELECT 
            depin,
            COUNT(DISTINCT node_id) as total_nodes,
            COUNT(DISTINCT node_id) FILTER (WHERE status IN ('active', 'online')) as active_nodes,
            AVG(uptime) as average_uptime
          FROM node_metrics
          WHERE recorded_at >= $1 AND recorded_at <= $2
          GROUP BY depin
          ORDER BY depin`,
          [from, to]
        )
        
        // Get region distribution
        const { rows: regionRows } = await client.query(
          `SELECT 
            depin,
            region,
            COUNT(DISTINCT node_id) as node_count
          FROM node_metrics
          WHERE recorded_at >= $1 AND recorded_at <= $2
          GROUP BY depin, region
          ORDER BY depin, region`,
          [from, to]
        )
        
        // Get growth data (nodes per month for last 6 months)
        const { rows: growthRows } = await client.query(
          `SELECT 
            depin,
            date_trunc('month', recorded_at) as month,
            COUNT(DISTINCT node_id) as node_count
          FROM node_metrics
          WHERE recorded_at >= date_trunc('month', NOW() - interval '6 months')
          GROUP BY depin, month
          ORDER BY depin, month`,
          []
        )
        
        // Process region data
        const regions = ['North America', 'Europe', 'Asia', 'Other']
        const regionData = [
          [0, 0, 0, 0], // Walrus
          [0, 0, 0, 0], // Helium
          [0, 0, 0, 0]  // Akash
        ]
        
        regionRows.forEach(row => {
          const networkIndex = ['walrus', 'helium', 'akash'].indexOf(row.depin)
          if (networkIndex === -1) return
          
          let regionIndex = regions.indexOf(row.region)
          if (regionIndex === -1) regionIndex = 3 // Other
          
          regionData[networkIndex][regionIndex] = parseInt(row.node_count)
        })
        
        // Process growth data
        const months = []
        const lastSixMonths = Array(6).fill().map((_, i) => {
          const date = new Date()
          date.setMonth(date.getMonth() - i)
          const monthName = date.toLocaleString('default', { month: 'short' })
          months.unshift(monthName)
          return date.toISOString().substring(0, 7) // YYYY-MM format
        })
        
        const growthDatasets = [
          { label: 'Walrus', data: Array(6).fill(0), borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.5)' },
          { label: 'Helium', data: Array(6).fill(0), borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.5)' },
          { label: 'Akash', data: Array(6).fill(0), borderColor: '#14b8a6', backgroundColor: 'rgba(20, 184, 166, 0.5)' }
        ]
        
        growthRows.forEach(row => {
          const networkIndex = ['walrus', 'helium', 'akash'].indexOf(row.depin)
          if (networkIndex === -1) return
          
          const monthStr = row.month.toISOString().substring(0, 7)
          const monthIndex = lastSixMonths.indexOf(monthStr)
          if (monthIndex !== -1) {
            growthDatasets[networkIndex].data[monthIndex] = parseInt(row.node_count)
          }
        })
        
        // Format final response
        reply.send({
          networks: ['Walrus', 'Helium', 'Akash'],
          totalNodes: statsRows.map(row => parseInt(row.total_nodes)),
          activeNodes: statsRows.map(row => parseInt(row.active_nodes)),
          uptime: statsRows.map(row => parseFloat(row.average_uptime)),
          regionDistribution: {
            labels: regions,
            data: regionData
          },
          growthData: {
            labels: months,
            datasets: growthDatasets
          }
        })
      } finally {
        client.release()
      }
    }
  )
}

/**
 * Simulated function to store data on Filecoin
 * In a real implementation, this would use Web3.Storage or similar
 */
async function storeOnFilecoin(depin, data) {
  // In a real implementation:
  // 1. Format the data as needed
  // 2. Use Web3.Storage or similar to store on Filecoin
  // 3. Return the CID for verification
  
  console.log(`Storing ${depin} data on Filecoin:`, data)
  return `bafybeig6xv5nwphfmvcnkfg6qjj6ui6qoqcz5hp4vbzwyqppafw5oqtfay` // Example CID
}

export default depinRoutes 