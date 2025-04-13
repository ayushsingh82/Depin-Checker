import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const WalrusData = () => {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalNodes: 0,
    activeNodes: 0,
    averageUptime: 0,
  });

  useEffect(() => {
    const fetchWalrusData = async () => {
      try {
        // This is a placeholder. In a real app, you would fetch from the actual Walrus API
        // const response = await fetch('https://api.walrus.example/nodes');
        // const data = await response.json();
        
        // Simulated data for demonstration
        const mockData = Array.from({ length: 20 }, (_, i) => ({
          id: `walrus-node-${i + 1}`,
          name: `Walrus Node ${i + 1}`,
          status: Math.random() > 0.2 ? 'active' : 'inactive',
          uptime: Math.floor(Math.random() * 100),
          location: {
            lat: 30 + Math.random() * 20,
            lng: -100 + Math.random() * 50,
          },
          lastSeen: new Date(Date.now() - Math.random() * 86400000).toISOString(),
        }));
        
        setNodes(mockData);
        
        // Calculate stats
        const activeNodes = mockData.filter(node => node.status === 'active').length;
        const avgUptime = mockData.reduce((sum, node) => sum + node.uptime, 0) / mockData.length;
        
        setStats({
          totalNodes: mockData.length,
          activeNodes,
          averageUptime: avgUptime.toFixed(2),
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Walrus data:', err);
        setError('Failed to fetch Walrus network data. Please try again later.');
        setLoading(false);
      }
    };

    fetchWalrusData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-5 max-w-4xl mx-auto">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Walrus Network Data</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Total Nodes</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalNodes}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Active Nodes</h2>
          <p className="text-4xl font-bold text-green-600">{stats.activeNodes}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Average Uptime</h2>
          <p className="text-4xl font-bold text-purple-600">{stats.averageUptime}%</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Node Locations</h2>
        <div className="h-96 rounded-lg overflow-hidden shadow-md">
          <MapContainer center={[40, -95]} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {nodes.map(node => (
              <Marker 
                key={node.id} 
                position={[node.location.lat, node.location.lng]}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{node.name}</h3>
                    <p>Status: <span className={node.status === 'active' ? 'text-green-600' : 'text-red-600'}>{node.status}</span></p>
                    <p>Uptime: {node.uptime}%</p>
                    <p>Last seen: {new Date(node.lastSeen).toLocaleString()}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Node Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Uptime</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Last Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {nodes.map(node => (
                <tr key={node.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{node.name}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      node.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {node.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{node.uptime}%</td>
                  <td className="py-3 px-4">{`${node.location.lat.toFixed(2)}, ${node.location.lng.toFixed(2)}`}</td>
                  <td className="py-3 px-4">{new Date(node.lastSeen).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WalrusData; 