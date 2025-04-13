import React from 'react'

const Home = () => {
  return (
    <div className="flex flex-col items-center p-5">
      <div className="flex flex-col items-center justify-center text-center min-h-[80vh] w-full bg-gradient-to-b from-black/70 to-black/70 bg-cover bg-center bg-[url('/hero-bg.jpg')] text-white p-5">
        <h1 className="text-5xl mb-5">Welcome to Our Website</h1>
        <p className="text-2xl mb-8">Your one-stop solution for all your needs</p>
        <button className="py-3 px-6 text-xl bg-blue-500 text-white border-none rounded cursor-pointer transition-all duration-300 hover:bg-blue-600 hover:-translate-y-1">
          Get Started
        </button>
      </div>
      
      <div className="flex flex-wrap justify-center gap-8 my-12 w-full max-w-6xl">
        <div className="bg-gray-50 rounded-lg p-8 w-[300px] shadow-md transition-transform duration-300 hover:-translate-y-3">
          <h3 className="text-2xl mb-4 text-gray-800">Feature 1</h3>
          <p className="text-gray-600 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 w-[300px] shadow-md transition-transform duration-300 hover:-translate-y-3">
          <h3 className="text-2xl mb-4 text-gray-800">Feature 2</h3>
          <p className="text-gray-600 leading-relaxed">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-8 w-[300px] shadow-md transition-transform duration-300 hover:-translate-y-3">
          <h3 className="text-2xl mb-4 text-gray-800">Feature 3</h3>
          <p className="text-gray-600 leading-relaxed">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </div>
      </div>
    </div>
  )
}

export default Home