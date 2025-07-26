import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { isLoggedIn } from '../api/authService';

const LandingLayout = () => {
  const user = isLoggedIn();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="font-bold text-xl text-indigo-600">Supply Setu</Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">Home</Link>
                <Link to="/#features" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">Features</Link>
                <Link to="/#about" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">About</Link>
                <Link to="/#contact" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600">Contact</Link>
                
                {user ? (
                  <Link to="/dashboard" className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/login" className="ml-4 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50">
                      Login
                    </Link>
                    <Link to="/register" className="ml-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button type="button" className="bg-white p-2 rounded-md text-gray-400 hover:text-gray-500">
                <span className="sr-only">Open main menu</span>
                {/* Menu icon */}
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main content area */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Supply Setu</h3>
              <p className="text-gray-300">Streamlining supply chain management for businesses of all sizes.</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/#features" className="text-gray-300 hover:text-white">Features</Link></li>
                <li><Link to="/#about" className="text-gray-300 hover:text-white">About</Link></li>
                <li><Link to="/#contact" className="text-gray-300 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-300">
                <p>Email: info@supplysetu.com</p>
                <p>Phone: +91 1234567890</p>
                <p>Address: 123 Business Park, Tech Hub, India</p>
              </address>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-6">
            <p className="text-center text-gray-300">© {new Date().getFullYear()} Supply Setu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;