import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { FaSuitcase, FaTrophy } from 'react-icons/fa';
import { MdWorkOutline } from 'react-icons/md';

const ENavbar = () => {
  const [username, setUsername] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const storedUsername = localStorage.getItem('username') || 'defaultUser';
    console.log(storedUsername)
    setUsername(storedUsername);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
    console.log(isSidebarOpen);
  };
  const handleClick = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('User');
    navigate('/')

  }

  return (
    <div className="Enavbar">
      <div className="menu-icon" onClick={toggleSidebar}>
        <span>&#9776;</span>
      </div>
      <div className={`enavbarlinks ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <Link to="/EDashboard" className="ml-3">Job Portal</Link>
        <Link className="flex gap-2 items-center justify-center" to="/EDashboard/jobposting">
          <MdWorkOutline /> Job Posting
        </Link>
        <Link className="flex gap-2 items-center justify-center">
          <FaTrophy /> Skill Assesment
        </Link>
        <Link className="flex gap-2 items-center justify-center" to="/EDashboard/myjobs">
          <FaSuitcase /> My Jobs
        </Link>
      </div>
      <div className='flex items-center justify-between gap-2'>
        <button
          onClick={handleClick}
          className="px-3 py-2  text-white rounded-md  hover:text-black transition duration-300"
        >
          Log Out
        </button>
        <div className="imgcontainer">
          <Link to={`/company/${username}`} className="flex items-center">
            <FiUser className="mr-3 cursor-pointer" size={30} color="whitesmoke" />
          </Link>
        </div>
      </div>
      {
        isSidebarOpen && (
          <div className="sidebar">
            <button className="close-btn" onClick={toggleSidebar}>&times;</button>
            <Link to="/EDashboard" onClick={toggleSidebar}>Logo</Link>
            <Link to="/EDashboard/jobposting" onClick={toggleSidebar}>Job Posting</Link>
            <Link onClick={toggleSidebar}>Skill Assesment</Link>
            <Link to="/EDashboard/myjobs" onClick={toggleSidebar}>My Jobs</Link>
          </div>
        )
      }
    </div >
  );
};

export default ENavbar;
