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

const HeliumData = () => {
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalHotspots: 0,
    activeHotspots: 0,
    averageRewards: 0,
  });

  useEffect(() => {
    const fetchHeliumData = async () => {
      try {
        // This is a placeholder. In a real app, you would fetch from the actual Helium API
        // const response = await fetch('https://api.helium.io/v1/hotspots');
        // const data = await response.json();
        
        // Simulated data for demonstration
        const mockData = Array.from({ length: 25 }, (_, i) => ({
          id: `helium-hotspot-${i + 1}`,
          name: `Helium Hotspot ${i + 1}`,
          status: Math.random() > 0.15 ? 'online' : 'offline',
          rewards: Math.random() * 10,
          location: {
            lat: 35 + Math.random() * 15,
            lng: -120 + Math.random() * 40,
          },
          lastActivity: new Date(Date.now() - Math.random() * 86400000 * 3).toISOString(),
          owner: `0x${Math.random().toString(16).substring(2, 14)}`,
        }));
        
        setHotspots(mockData);
        
        // Calculate stats
        const activeHotspots = mockData.filter(hotspot => hotspot.status === 'online').length;
        const avgRewards = mockData.reduce((sum, hotspot) => sum + hotspot.rewards, 0) / mockData.length;
        
        setStats({
          totalHotspots: mockData.length,
          activeHotspots,
          averageRewards: avgRewards.toFixed(2),
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching Helium data:', err);
        setError('Failed to fetch Helium network data. Please try again later.');
        setLoading(false);
      }
    };

    fetchHeliumData();
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
      <h1 className="text-3xl font-bold mb-6 text-center">Helium Network Data</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Total Hotspots</h2>
          <p className="text-4xl font-bold text-blue-600">{stats.totalHotspots}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Active Hotspots</h2>
          <p className="text-4xl font-bold text-green-600">{stats.activeHotspots}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Avg. Rewards (HNT)</h2>
          <p className="text-4xl font-bold text-purple-600">{stats.averageRewards}</p>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hotspot Locations</h2>
        <div className="h-96 rounded-lg overflow-hidden shadow-md">
          <MapContainer center={[39, -98]} zoom={4} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {hotspots.map(hotspot => (
              <Marker 
                key={hotspot.id} 
                position={[hotspot.location.lat, hotspot.location.lng]}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{hotspot.name}</h3>
                    <p>Status: <span className={hotspot.status === 'online' ? 'text-green-600' : 'text-red-600'}>{hotspot.status}</span></p>
                    <p>Rewards: {hotspot.rewards.toFixed(2)} HNT</p>
                    <p>Last activity: {new Date(hotspot.lastActivity).toLocaleString()}</p>
                    <p className="text-xs truncate">Owner: {hotspot.owner}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Hotspot Details</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Rewards (HNT)</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {hotspots.map(hotspot => (
                <tr key={hotspot.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">{hotspot.name}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      hotspot.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {hotspot.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{hotspot.rewards.toFixed(2)}</td>
                  <td className="py-3 px-4">{`${hotspot.location.lat.toFixed(2)}, ${hotspot.location.lng.toFixed(2)}`}</td>
                  <td className="py-3 px-4">{new Date(hotspot.lastActivity).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HeliumData; 