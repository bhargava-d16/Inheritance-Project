import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { Link } from 'react-router-dom';
const JSCard = ({ name, DOB, skills,username, exp, location }) => {
    
    const displayedSkills = skills.slice(0, 4);
    return (
        <div className='jscard'>
            <div className="s1">
                <img className='jsimage' src="public/images/person1.png" alt="Profile Photo" />
                <div className='s1info'>
                    <h4>{name}</h4>
                    <p>DOB:{DOB}</p>
                    <p><h5 className='inline'>Location:</h5>{location}</p>
                </div>
            </div>
            <div className="s2">
                <h4>Skills</h4>
                <ul className="skills-list">
                    {displayedSkills.map((skill, index) => (
                        <li key={index}>{skill.trim()}</li>
                    ))}
                </ul>
                {skills.length > 4 ? <p>View More skills in candidate's profile</p> : ""}

                <h6>Experience:{exp}</h6>
            </div>
            <div className="btns">
                <button className='viewprofilebtn '><Link to={`/user/${username}`}>View Profile</Link></button>
                <button className='shortlistbtn '>ShortList</button>
            </div>
        </div>
    )
}

export default JSCard