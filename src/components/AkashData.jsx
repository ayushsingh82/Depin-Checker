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

const AkashData = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalProviders: 0,
    activeProviders: 0,
    totalDeployments: 0,
    averageUptime: 0,
  });

  useEffect(() => {
    const fetchAkashData = async () => {
      try {
        // This is a placeholder. In a real app, you would fetch from the actual Akash API
        // const response = await fetch('https://api.akash.network/providers');
        // const data = await response.json();
        
        // Simulated data for demonstration
        const mockData = Array.from({ length: 18 }, (_, i) => ({
          id: `akash-provider-${i + 1}`,
          name: `Akash Provider ${i + 1}`,
          status: Math.random() > 0.1 ? 'active' : 'inactive',
          uptime: Math.floor(85 + Math.random() * 15),
          deployments: Math.floor(Math.random() * 50),
          location: {
            lat: 25 + Math.random() * 40,
            lng: -150 + Math.random() * 100,
            region: ['US West', 'US East', 'Europe', 'Asia Pacific'][Math.floor(Math.random() * 4)],
          },
          resources: {
            cpu: Math.floor(16 + Math.random() * 48),
            memory: Math.floor(32 + Math.random() * 96),
            storage: Math.floor(500 + Math.random() * 1500),
          },
          lastSeen: new Date(Date.now() - Math.random() * 86400000 * 2).toISOString(),
        }));
        
        setProviders(mockData);
        
        // Calculate stats
        const activeProviders = mockData.filter(provider => provider.status === 'active').length;
        const totalDeployments = mockData.reduce((sum, provider) => sum + provider.deployments, 0);
        const avgUptime = mockData.reduce((sum, provider) => sum + provider.uptime, 0) / mockData.length;
        
        setStats({
          totalProviders: mockData.length,
          activeProviders,
          totalDeployments,
          averageUptime: avgUptime.toFixed(2),
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Akash data:', err);
        setError('Failed to fetch Akash network data. Please try again later.');
        setLoading(false);
      }
    };

    fetchAkashData();
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
      <h1 className="text-3xl font-bold mb-6 text-center">Akash Network Data</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Total Providers</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalProviders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Active Providers</h2>
          <p className="text-4xl font-bold text-green-600">{stats.activeProviders}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Total Deployments</h2>
          <p className="text-4xl font-bold text-yellow-600">{stats.totalDeployments}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Average Uptime</h2>
          <p className="text-4xl font-bold text-purple-600">{stats.averageUptime}%</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Provider Locations</h2>
        <div className="h-96 rounded-lg overflow-hidden shadow-md">
          <MapContainer center={[30, -30]} zoom={2} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {providers.map(provider => (
              <Marker 
                key={provider.id} 
                position={[provider.location.lat, provider.location.lng]}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{provider.name}</h3>
                    <p>Status: <span className={provider.status === 'active' ? 'text-green-600' : 'text-red-600'}>{provider.status}</span></p>
                    <p>Region: {provider.location.region}</p>
                    <p>Uptime: {provider.uptime}%</p>
                    <p>Deployments: {provider.deployments}</p>
                    <p>Resources: {provider.resources.cpu} CPU cores, {provider.resources.memory}GB RAM, {provider.resources.storage}GB storage</p>
                    <p>Last seen: {new Date(provider.lastSeen).toLocaleString()}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Provider Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Region</th>
                <th className="py-3 px-4 text-left">Uptime</th>
                <th className="py-3 px-4 text-left">Deployments</th>
                <th className="py-3 px-4 text-left">Resources</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {providers.map(provider => (
                <tr key={provider.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{provider.name}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      provider.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {provider.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{provider.location.region}</td>
                  <td className="py-3 px-4">{provider.uptime}%</td>
                  <td className="py-3 px-4">{provider.deployments}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs">
                      {provider.resources.cpu} CPU | {provider.resources.memory}GB RAM | {provider.resources.storage}GB
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AkashData; 