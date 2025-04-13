import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-400' : 'text-white';
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-blue-900 h-20 flex justify-center items-center sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center w-full max-w-7xl px-5">
        <Link to="/" className="text-white text-3xl font-bold no-underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          DePIN Checker
        </Link>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex list-none m-0 p-0 items-center">
          <li className="ml-5">
         
          </li>
          <li className="ml-5">
            <Link to="/walrus" className={`${isActive('/walrus')} no-underline text-lg py-2 px-3 transition-all duration-300 hover:text-blue-400 font-medium`}>
              Walrus
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/helium" className={`${isActive('/helium')} no-underline text-lg py-2 px-3 transition-all duration-300 hover:text-blue-400 font-medium`}>
              Helium
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/akash" className={`${isActive('/akash')} no-underline text-lg py-2 px-3 transition-all duration-300 hover:text-blue-400 font-medium`}>
              Akash
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/compare" className={`${isActive('/compare')} no-underline text-lg py-2 px-3 transition-all duration-300 hover:text-blue-400 font-medium`}>
              Compare
            </Link>
          </li>
          <li className="ml-5">
           
          </li>
        </ul>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-gray-900 shadow-lg">
          <ul className="flex flex-col list-none m-0 p-0">
            <li>
              <Link 
                to="/" 
                className={`${isActive('/')} block py-3 px-5 no-underline text-lg hover:bg-gray-800`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/walrus" 
                className={`${isActive('/walrus')} block py-3 px-5 no-underline text-lg hover:bg-gray-800`}
                onClick={() => setIsMenuOpen(false)}
              >
                Walrus
              </Link>
            </li>
            <li>
              <Link 
                to="/helium" 
                className={`${isActive('/helium')} block py-3 px-5 no-underline text-lg hover:bg-gray-800`}
                onClick={() => setIsMenuOpen(false)}
              >
                Helium
              </Link>
            </li>
            <li>
              <Link 
                to="/akash" 
                className={`${isActive('/akash')} block py-3 px-5 no-underline text-lg hover:bg-gray-800`}
                onClick={() => setIsMenuOpen(false)}
              >
                Akash
              </Link>
            </li>
            <li>
              <Link 
                to="/compare" 
                className={`${isActive('/compare')} block py-3 px-5 no-underline text-lg hover:bg-gray-800`}
                onClick={() => setIsMenuOpen(false)}
              >
                Compare
              </Link>
            </li>
            <li>
              <Link 
                to="/test" 
                className="block py-3 px-5 no-underline text-lg bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                Test
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default Navbar