import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
const JSCard = ({ name, DOB, skills, username, exp, location,id,isshortlisted,opentooffers }) => {
    const displayedSkills = skills.slice(0, 4);
    const [shortlist, setShortlist] = useState(isshortlisted)
    const handleShortlist = async (e, id) => {
        const action = shortlist ? "reject" : "shortlist"; 
        const jwtToken = localStorage.getItem("jwtToken");

        try {
            const response = await axios.post(
                "http://localhost:8080/EDashboard",
                { id, action },
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                }
            );

            if (response.data.success) {
                setShortlist(!shortlist);
                console.log(response.data.msg);
            } else {
                console.error("Error:", response.data.msg);
            }
        }catch (error) {
            console.error("Error updating shortlist status:", error);
        }
    };
    
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
                        index < 10 ? <li key={index}>{skill.trim()}</li> : null
                    ))}
                </ul>
                {skills.length > 4 ? <p>View More skills in candidate's profile</p> : ""}

                <h6>Experience:{exp}</h6>
            </div>
            <div className="btns">
                <button className='viewprofilebtn '><Link to={`/user/${username}`}>View Profile</Link></button>
                {opentooffers?<button className='shortlistbtn' onClick={(e)=>handleShortlist(e,id)}>{(shortlist)?"Reject":"ShortList"}</button>:""}
                
            </div>
        </div>
    )
}

export default JSCard