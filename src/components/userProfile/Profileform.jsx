import { FaUserCircle } from "react-icons/fa"; // Import user icon
import React, { useState } from "react";


const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    place: "New York, USA",
    email: "johndoe@example.com",
    phone: "+1 234 567 8901",
    education: "Bachelor of Science in Computer Science",
    workExperience: "Software Engineer at XYZ Ltd.",
    extracurricular: "Football, Music, Coding Club",
    academics: "GPA: 3.8/4.0",
    skills: "React, Node.js, Python, SQL",
    currentlyWorking: "none"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Profile & Resume</h2>

      <div className="space-y-4">
        {Object.keys(user).map((key) => (
          <div key={key}>
            <label className="block text-gray-600 font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</label>
            {isEditing ? (
              <input
                type="text"
                name={key}
                value={user[key]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
              />
            ) : (
              <p className="text-gray-700">{user[key]}</p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
      >
        {isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
};

export default UserProfile;
