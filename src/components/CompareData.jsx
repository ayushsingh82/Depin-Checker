import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const CompareData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [compareData, setCompareData] = useState({
    networks: ['Walrus', 'Helium', 'Akash'],
    totalNodes: [0, 0, 0],
    activeNodes: [0, 0, 0],
    uptime: [0, 0, 0],
    regionDistribution: {
      labels: ['North America', 'Europe', 'Asia', 'Other'],
      data: [
        [0, 0, 0, 0], // Walrus
        [0, 0, 0, 0], // Helium
        [0, 0, 0, 0], // Akash
      ],
    },
    growthData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [],
    },
  });

  useEffect(() => {
    const fetchComparisonData = async () => {
      try {
        // In a real app, you would fetch data from all three networks
        // For demonstration, we'll use mock data
        
        // Mock total nodes
        const totalNodes = [20, 25, 18]; // Walrus, Helium, Akash
        
        // Mock active nodes
        const activeNodes = [16, 21, 16]; // Walrus, Helium, Akash
        
        // Mock uptime percentages
        const uptime = [92.5, 88.7, 95.3]; // Walrus, Helium, Akash
        
        // Mock region distribution
        const regionDistribution = {
          labels: ['North America', 'Europe', 'Asia', 'Other'],
          data: [
            [45, 30, 15, 10], // Walrus
            [50, 25, 20, 5],  // Helium
            [35, 40, 20, 5],  // Akash
          ],
        };
        
        // Mock growth data
        const growthData = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Walrus',
              data: [12, 14, 16, 17, 19, 20],
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
              label: 'Helium',
              data: [15, 17, 19, 21, 23, 25],
              borderColor: 'rgb(255, 99, 132)',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Akash',
              data: [10, 12, 13, 15, 16, 18],
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
            },
          ],
        };
        
        setCompareData({
          networks: ['Walrus', 'Helium', 'Akash'],
          totalNodes,
          activeNodes,
          uptime,
          regionDistribution,
          growthData,
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching comparison data:', err);
        setError('Failed to fetch comparison data. Please try again later.');
        setLoading(false);
      }
    };

    fetchComparisonData();
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

  // Bar chart data for nodes comparison
  const nodesData = {
    labels: compareData.networks,
    datasets: [
      {
        label: 'Total Nodes',
        data: compareData.totalNodes,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Active Nodes',
        data: compareData.activeNodes,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  // Bar chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Node Comparison',
      },
    },
  };

  // Uptime comparison data
  const uptimeData = {
    labels: compareData.networks,
    datasets: [
      {
        label: 'Average Uptime (%)',
        data: compareData.uptime,
        backgroundColor: [
          'rgba(53, 162, 235, 0.5)',
          'rgba(255, 99, 132, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgb(53, 162, 235)',
          'rgb(255, 99, 132)',
          'rgb(75, 192, 192)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Create region distribution data for each network
  const regionData = compareData.networks.map((network, index) => ({
    labels: compareData.regionDistribution.labels,
    datasets: [
      {
        label: `${network} Region Distribution`,
        data: compareData.regionDistribution.data[index],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }));

  return (
    <div className="p-5 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">DePIN Networks Comparison</h1>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Node Count Comparison</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={nodesData} options={barOptions} />
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Uptime Comparison</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Bar data={uptimeData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Average Uptime Percentage',
              },
            },
          }} />
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Network Growth Over Time</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <Line 
            data={compareData.growthData} 
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: 'Node Growth (Last 6 Months)',
                },
              },
            }} 
          />
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Regional Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {regionData.map((data, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-medium mb-2 text-center">{compareData.networks[index]}</h3>
              <Pie data={data} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Insights</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <ul className="list-disc pl-5 space-y-2">
            <li>Helium has the highest number of total nodes, but Akash has the best active node percentage.</li>
            <li>Akash network shows the highest average uptime at {compareData.uptime[2]}%.</li>
            <li>Helium has the strongest presence in North America, while Akash is more evenly distributed between North America and Europe.</li>
            <li>All three networks show steady growth over the past 6 months, with Helium growing at the fastest rate.</li>
            <li>The data is stored on Filecoin for verifiable reputation tracking across all DePIN networks.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompareData; 