
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthNav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock notifications data
  const handleNavigation = (path) => {
    setIsMenuOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 300);
  };

  return (
    <>
      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-white"></div>
        </div>
      )}

      {/* Navigation Bar */}
      <nav
        className="sticky top-0 z-50 w-full shadow-md"
        style={{
          backgroundColor: '#133E87',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Navigation Links */}
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-bold text-white pr-8 pl-2">
                JobPortal
              </span>
              <button
                onClick={() => handleNavigation('/')}
                className="block px-4 py-2 text-sm  text-white hover:bg-transparent underline-offset-4 hover:underline"
              >
                Home
              </button>
            </div>

            
          </div>
        </div>
      </nav>
    </>
  );
};

export default AuthNav;