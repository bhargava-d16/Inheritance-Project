import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../context/useLogout";
import toast from 'react-hot-toast';

let sharedUsername = "";

const UserNav = () => {
  const [username, setUsername] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showScheduledMeetsPopup, setShowScheduledMeetsPopup] = useState(false);
  const [scheduledMeets, setScheduledMeets] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const getUsername = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const response = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data) {
          setUsername(response.data.username);
          sharedUsername = response.data.username;
          setNotifications(response.data.notifications);
        }
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  };

  const handleScheduledMeetingsClick = async () => {
    try {
      const response = await axios.get(`/api/scheduled-meets/${sharedUsername}`);
      setScheduledMeets(response.data);
      setShowScheduledMeetsPopup(true);
    } catch (error) {
      console.error("Error fetching scheduled meets:", error);
      toast.error(error.response?.data?.message || "Error fetching scheduled meetings");
    }
  };


  useEffect(() => {
    getUsername();
  }, []);

  const handleRead = async (notificationId) => {
    const username = localStorage.getItem("username");
    try {
      await axios.put("/api/user", {
        notificationId,
        username,
      });
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, isRead: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

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
      <nav className="sticky top-0 z-50 w-full shadow-md" style={{ backgroundColor: "#133E87", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and Navigation Links */}
            <div className="flex items-center space-x-4">
              <Link className="no-underline" to="/">
                <span className="text-2xl font-bold text-white pr-8 pl-2">JobPortal</span>
              </Link>
              <button onClick={() => handleNavigation("/user")} className="block px-4 py-2 text-sm text-white hover:bg-transparent underline-offset-4 hover:underline">
                Home
              </button>
              <button onClick={() => handleNavigation("/user/jobs")} className="block px-4 py-2 text-sm text-white hover:bg-transparent underline-offset-4 hover:underline">
                Jobs
              </button>
              <button onClick={handleScheduledMeetingsClick} className="block px-4 py-2 text-sm text-white hover:bg-transparent underline-offset-4 hover:underline">
                Scheduled Meetings
              </button>
            </div>

            {/* Notifications */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 text-white hover:bg-[#1e4ea3] rounded-full relative">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border overflow-hidden">
                    <div className="p-3 border-b bg-gray-50">
                      <h3 className="font-semibold text-gray-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div key={notification._id} className={`p-3 border-b hover:bg-gray-50 transition-colors ${!notification.isRead ? "bg-blue-50" : ""}`}>
                            <div className="flex items-start justify-between">
                              <div>
                                {/* Notification Message */}
                                <p className="text-sm text-gray-800">{notification.message}</p>

                                {/* Timestamp */}
                                <div className="flex align-middle w-full">
                                  <span className="text-xs text-gray-500">{new Date(notification.timestamp).toLocaleString()}</span>
                                  <span className={notification.isRead ? "hidden" : "bg-emerald-500 rounded-md font-mono text-sm relative left-12"}>
                                    <button onClick={() => handleRead(notification._id)}>Mark as Read</button>
                                  </span>
                                </div>
                              </div>

                              {/* Unread Badge */}
                              {!notification.isRead && (
                                <span className="px-2 py-1 text-xs font-semibold text-white bg-[#133E87] rounded-full">New</span>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-sm text-gray-500">No notifications available.</div>
                      )}
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

      {showScheduledMeetsPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-1/3 p-6 flex flex-col max-h-[80vh]">
            <h3 className="text-xl font-semibold text-[#133E87] mb-4">
              Scheduled Meetings
            </h3>

            <div className="overflow-y-auto max-h-[60vh] pr-2">
              {scheduledMeets && scheduledMeets.length > 0 ? (
                <ul>
                  {scheduledMeets.map((meet, index) => (
                    <li
                      key={index}
                      className="bg-white shadow-lg rounded-xl p-6 mb-6 hover:shadow-2xl transition-all ease-in-out"
                    >
                      <h4 className="text-xl font-semibold text-[#133E87] mb-4 hover:text-[#1e4ea3] transition-colors">
                        {meet.title}
                      </h4>

                      <div className="space-y-3">
                        <p className="text-sm text-gray-800">
                          <strong className="text-[#133E87]">Username:</strong>{" "}
                          <span className="text-gray-600">{meet.username}</span>
                        </p>

                        <p className="text-sm text-gray-800">
                          <strong className="text-[#133E87]">Date:</strong>{" "}
                          <span className="text-gray-600">{meet.date}</span>
                        </p>

                        <p className="text-sm text-gray-800">
                          <strong className="text-[#133E87]">Time:</strong>{" "}
                          <span className="text-gray-600">{meet.time}</span>
                        </p>

                        <p className="text-sm text-gray-800">
                          <strong className="text-[#133E87]">Link:</strong>{" "}
                          <a
                            href={meet.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#1e4ea3] hover:underline font-medium"
                          >
                            {meet.link}
                          </a>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700 text-center py-4">No scheduled meetings found.</p>
              )}
            </div>

            {/* Fixed Close Button */}
            <div className="pt-4 border-t flex justify-center">
              <button
                onClick={() => setShowScheduledMeetsPopup(false)}
                className="px-4 py-2 bg-[#133E87] text-white rounded-md hover:bg-[#608BC1]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { sharedUsername };
export default UserNav;
