import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section - Updated with white background */}
      <div className="flex flex-col items-center justify-center text-center min-h-[85vh] w-full bg-white text-gray-800 p-5 relative overflow-hidden">
        {/* Floating elements for visual interest */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">DePIN Checker</h1>
          <p className="text-2xl md:text-3xl mb-4 text-gray-700 font-medium">Verifiable Reputation Data for DePIN Networks</p>
          <p className="text-xl max-w-3xl mb-10 text-gray-600 mx-auto">
            Track and analyze node performance, uptime, and geographic distribution across Walrus, Helium, and Akash networks with data securely stored on Filecoin.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/compare" className="py-3 px-8 text-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Compare Networks
            </Link>
            <Link to="/walrus" className="py-3 px-8 text-xl bg-white border-2 border-blue-600 text-blue-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              Explore Data
            </Link>
          </div>
        </div>
        
        {/* Floating cards */}
        <div className="absolute top-1/4 -left-16 w-64 bg-white rounded-lg shadow-xl p-4 transform -rotate-12 opacity-80 hidden lg:block">
          <div className="h-3 w-3/4 bg-blue-400 rounded-full mb-2"></div>
          <div className="h-2 w-1/2 bg-blue-300 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/4 -right-16 w-64 bg-white rounded-lg shadow-xl p-4 transform rotate-12 opacity-80 hidden lg:block">
          <div className="h-3 w-3/4 bg-teal-400 rounded-full mb-2"></div>
          <div className="h-2 w-1/2 bg-teal-300 rounded-full"></div>
        </div>
      </div>
      
      {/* Networks Section */}
      <div className="w-full py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Supported DePIN Networks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">Walrus Network</h3>
              <p className="text-gray-600 mb-6 text-center">Decentralized storage and compute infrastructure with verifiable performance metrics.</p>
              <div className="text-center">
                <Link to="/walrus" className="text-blue-600 font-medium hover:text-blue-800">
                  View Walrus Data →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">Helium Network</h3>
              <p className="text-gray-600 mb-6 text-center">Decentralized wireless infrastructure with hotspots providing coverage and earning rewards.</p>
              <div className="text-center">
                <Link to="/helium" className="text-red-600 font-medium hover:text-red-800">
                  View Helium Data →
                </Link>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-16 w-16 rounded-full bg-teal-100 flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-4">Akash Network</h3>
              <p className="text-gray-600 mb-6 text-center">Decentralized cloud computing marketplace with providers offering compute resources.</p>
              <div className="text-center">
                <Link to="/akash" className="text-teal-600 font-medium hover:text-teal-800">
                  View Akash Data →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="w-full py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Metrics</h3>
              <p className="text-gray-600">Monitor node performance, uptime, and activity across multiple networks.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Geographic Mapping</h3>
              <p className="text-gray-600">Visualize the global distribution of nodes with interactive maps.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Comparative Analysis</h3>
              <p className="text-gray-600">Compare performance metrics across different DePIN networks.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 shadow-md">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Filecoin Storage</h3>
              <p className="text-gray-600">All reputation data securely stored on Filecoin for verifiability and permanence.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Explore DePIN Network Data?</h2>
          <p className="text-xl mb-8">Get insights into node performance, geographic distribution, and network health.</p>
          <Link to="/compare" className="py-3 px-8 text-xl bg-white text-blue-700 font-medium rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300">
            Start Comparing Networks
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home