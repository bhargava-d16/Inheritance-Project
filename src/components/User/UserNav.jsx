

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../context/useLogout';
let sharedUsername = '';
const UserNav = () => {
  const [username, setUsername] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const {user}=useAuthContext();
  const { logout } = useLogout();
  // Mock notifications data
  const notifications = [
    { id: 1, message: 'New job matching your profile', time: '2h ago', isNew: true },
    { id: 2, message: 'Application status updated', time: '1d ago', isNew: false },
    { id: 3, message: 'Interview scheduled tomorrow', time: '12h ago', isNew: true }
  ];
 
  const getusername = async () => {
    
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const  response = await axios.get("http://localhost:8080/user", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        })
        setUsername(response.data.username)
          sharedUsername=response.data.username;
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }
  const handlenotifications=()=>{
    console.log("notifiactions")
  }
  useEffect(() => {
    getusername();
    
  }, []);

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
                onClick={() => handleNavigation('/user')}
                className="block px-4 py-2 text-sm text-white hover:bg-transparent underline-offset-4 hover:underline"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation('/user/jobs')}
                className="block px-4 py-2 text-sm text-white hover:bg-transparent underline-offset-4 hover:underline"
              >
                Jobs
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 text-white hover:bg-[#1e4ea3] rounded-full relative"
                >
                  <Bell size={20} onClick={handlenotifications} />
                  {notifications.some(n => n.isNew) && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border overflow-hidden">
                    <div className="p-3 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(notification => (
                        <div
                          key={notification.id}
                          className="p-3 border-b hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="text-sm text-gray-800">{notification.message}</p>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            {notification.isNew && (
                              <span className="px-2 py-1 text-xs font-semibold text-white bg-[#133E87] rounded-full">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-md"
                  aria-label="Toggle menu"
                >
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="4" y="6" width="16" height="2" rx="1" />
                    <rect x="4" y="12" width="16" height="2" rx="1" />
                    <rect x="4" y="18" width="16" height="2" rx="1" />
                  </svg>
                </button>

                {isMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 bg-white border border-gray-200"
                  >
                    <button
                      onClick={() => handleNavigation(`/user/${username}`)}
                      className="block w-full text-left px-4 py-2 text-sm text-[#133E87]  hover:underline"
                    >
                      Profile
                    </button>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-[#133E87]  hover:underline"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export  {sharedUsername}
export default UserNav;