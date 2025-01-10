import React from 'react'
import { Link } from 'react-router-dom'
const ENavbar = () => {
  return (
    <div className='Enavbar'>
        <div className="enavbarlinks text-black">
            <Link to='/EDashboard'>Logo</Link>
            <Link to='/EDashboard/jobposting'>Job Posting</Link>
            <Link>Skill Assesment</Link>
        </div>
        <div className="imgcontainer">
          <img className='profileicon' src="public\images\notification_important_26dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png" alt="" />
          <img className='profileicon'
          src="public\images\person_26dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png"
          alt="Profile Icon"
        /></div>
    </div>
  )
}

export default ENavbar