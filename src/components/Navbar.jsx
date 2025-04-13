import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-800 h-20 flex justify-center items-center sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center w-full max-w-6xl px-5">
        <Link to="/" className="text-white text-3xl font-bold no-underline">
          DePIN Checker
        </Link>
        <ul className="flex list-none m-0 p-0">
          <li className="ml-5">
            <Link to="/" className="text-white no-underline text-xl py-2 px-3 transition-all duration-300 hover:text-blue-400">
              Home
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/walrus" className="text-white no-underline text-xl py-2 px-3 transition-all duration-300 hover:text-blue-400">
              Walrus
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/helium" className="text-white no-underline text-xl py-2 px-3 transition-all duration-300 hover:text-blue-400">
              Helium
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/akash" className="text-white no-underline text-xl py-2 px-3 transition-all duration-300 hover:text-blue-400">
              Akash
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/compare" className="text-white no-underline text-xl py-2 px-3 transition-all duration-300 hover:text-blue-400">
              Compare
            </Link>
          </li>
          <li className="ml-5">
            <Link to="/test" className="text-white no-underline text-xl py-2 px-3 transition-all duration-300 hover:text-blue-400">
              Test
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar