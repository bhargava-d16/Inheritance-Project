import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "./buttons.jsx"

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8080/user/${username}`);
        setUserProfile(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username ]);

  const onRemove = (skillToRemove) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      skills: prevProfile.skills.filter((skill) => skill !== skillToRemove),
    }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: Array.isArray(prevProfile[name])
        ? value.split(",").map((item) => item.trim())
        : value,
    }));
  };

  const saveData = async () => {
    if (!userProfile) return;
    const newUserProfile = {
      ...userProfile,
      skills: userProfile.skills.filter((skill) => skill.trim() !== "") // Also trims whitespace
    };
    setUserProfile(newUserProfile)

    try {
      setSaving(true);

      await axios.put(
        `http://localhost:8080/user/${username}`,
        JSON.stringify(newUserProfile),
        { headers: { "Content-Type": "application/json" } }
      );

      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
        alert(error.response.data.message || "Failed to update profile.");
      } else if (error.request) {
        console.error("No response from server:", error.request);
        alert("Server is unreachable. Please try again later.");
      } else {
        console.error("Error:", error.message);
        alert("An unexpected error occurred.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-[#133E87]">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!userProfile) return <p className="text-center text-[#133E87]">No user data found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8 border border-[#CBDCEB]">
      <h2 className="text-2xl font-bold text-[#133E87] mb-4 text-center">Your Profile and Resume</h2>

      <div className="space-y-4">
        {Object.entries(userProfile)
          .filter(([key]) => key !== "id" && key !== "_v")
          .map(([key, value]) => (
            <div key={key}>
              <label className="block text-[#133E87] font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </label>
              {isEditing && key !== "username" ? (
                key === "opentooffers" ? (
                  <div className="flex space-x-4 mt-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="opentooffers"
                        value="Yes"
                        checked={userProfile.opentooffers === "Yes"}
                        onChange={handleChange}
                        className="w-5 h-5 text-[#133E87] focus:ring-[#608BC1]"
                      />
                      <span className="text-[#133E87]">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="opentooffers"
                        value="No"
                        checked={userProfile.opentooffers === "No"}
                        onChange={handleChange}
                        className="w-5 h-5 text-[#133E87] focus:ring-[#608BC1]"
                      />
                      <span className="text-[#133E87]">No</span>
                    </label>
                  </div>
                ) : (
                  Array.isArray(value) ? (
                    <div>
                    <div className="flex flex-wrap gap-2">
                      {value.map((skill, index) => (
                        <Button key={index} skill={skill} isEditing={isEditing} onRemove={onRemove}/>
                      ))}
                    </div>
                    <input
                    type={key !== "DOB" ? "text" : "date" }
                    name={key}
                    value={Array.isArray(value) ? value.join(", ") : value || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#CBDCEB] rounded-md bg-white focus:outline-none focus:ring focus:ring-[#608BC1]"
                  />
                  </div>
                  )
                  :
                  <input
                    type={key !== "DOB" ? "text" : "date" }
                    name={key}
                    value={Array.isArray(value) ? value.join(", ") : value || ""}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#CBDCEB] rounded-md bg-white focus:outline-none focus:ring focus:ring-[#608BC1]"
                  />
                )
              ) : (
                Array.isArray(value) ? (
                  <div className="flex flex-wrap gap-2">
                    {value.map((skill, index) => (
                      <Button key={index} skill={skill} />
                    ))}
                  </div>
                ) : (
                  <p className="text-[#133E87]">
                    {key === "opentooffers" ? (value === "Yes" ? "Yes" : "No") : value || "N/A"}
                  </p>
                )
              )}
            </div>
          ))}
      </div>

      <div className="flex justify-end mt-6 space-x-2">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-[#CBDCEB] text-[#133E87] rounded-md hover:bg-[#608BC1] transition duration-200"
            >
              Cancel
            </button>
            <button
              onClick={saveData}
              disabled={saving}
              className={`px-4 py-2 text-white rounded-md transition duration-200 ${
                saving ? "bg-gray-400 cursor-not-allowed" : "bg-[#133E87] hover:bg-[#608BC1]"
              }`}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-[#133E87] text-white rounded-md hover:bg-[#608BC1] transition duration-200"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;