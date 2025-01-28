import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const JSCard = ({
  name,
  DOB,
  skills,
  username,
  exp,
  location,
  id,
  isshortlisted,
  opentooffers,
}) => {
  console.log(opentooffers);
  const displayedSkills = skills.slice(0, 4);
  const [shortlist, setShortlist] = useState(isshortlisted);
  const handleShortlist = async (e) => {
    const jwtToken = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "http://localhost:8080/EDashboard",
        { username },
        {
          headers: { Authorization: `Bearer ${jwtToken}` },
        }
      );
      if (response.data.success) {
        alert("User has been notified for this!");
        console.log(response.data.msg);
      } else {
        alert("User has been already Reached out");
        console.error("Error:", response.data.msg);
      }
    } catch (error) {
      console.error("Error updating shortlist status:", error);
    }
  };

  return (
    <div className="jscard">
      <div className="s1">
        <img
          className="jsimage"
          src="public/images/person1.png"
          alt="Profile Photo"
        />
        <div className="s1info">
          <h4>{name}</h4>
          <p>DOB:{DOB}</p>
          <p>
            <h5 className="inline">Location:</h5>
            {location}
          </p>
        </div>
      </div>
      <div className="s2">
        <h4>Skills</h4>
        <ul className="skills-list">
          {displayedSkills.map((skill, index) =>
            index < 10 ? <li key={index}>{skill.trim()}</li> : null
          )}
        </ul>
        {skills.length > 4 ? (
          <p>View More skills in candidate's profile</p>
        ) : (
          ""
        )}

        <h6>Experience:{exp}</h6>
      </div>
      <div className="btns">
        <button className="viewprofilebtn ">
          <Link to={`/user/${username}`}>View Profile</Link>
        </button>
        {["true", "yes", true].includes(opentooffers) && (
          <button
            className="shortlistbtn"
            onClick={(e) => handleShortlist(e, username)}
          >
            Reach Out..
          </button>
        )}
      </div>
    </div>
  );
};

export default JSCard;
