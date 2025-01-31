import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "./Button.jsx";

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
  }, [username]);

  const onRemove = (skillToRemove) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      skills: prevProfile.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

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
      skills: userProfile.skills.filter((skill) => skill.trim() !== "")
    };
    setUserProfile(newUserProfile);

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

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#133E87] border-t-transparent"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 rounded-lg border border-red-200">
      <p className="text-center text-red-600 font-medium">Error: {error}</p>
    </div>
  );

  if (!userProfile) return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
      <p className="text-center text-[#133E87] font-medium">No user data found.</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-[#2557a7] px-6 py-4">
          <h2 className=" text-2xl font-bold text-white flex justify-center ">User Profile</h2>
        </div>

        <div className="p-6">
          <div className="grid gap-6">
            {Object.entries(userProfile)
              .filter(([key]) => key !== "_id" && key !== "__v" && key !== "notifications")
              .map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  {isEditing && key !== "username" ? (
                    key === "opentooffers" ? (
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="opentooffers"
                            value="Yes"
                            checked={userProfile.opentooffers === "Yes"}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#2557a7]"
                          />
                          <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="opentooffers"
                            value="No"
                            checked={userProfile.opentooffers === "No"}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#2557a7]"
                          />
                          <span className="text-sm text-gray-700">No</span>
                        </label>
                      </div>
                    ) : (
                      Array.isArray(value) ? (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {value.map((skill, index) => (
                              <Button key={index} skill={skill} isEditing={isEditing} onRemove={onRemove} />
                            ))}
                          </div>
                          <input
                            type="text"
                            name={key}
                            value={Array.isArray(value) ? value.join(", ") : value || ""}
                            onChange={handleChange}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2557a7] focus:border-[#2557a7]"
                          />
                        </div>
                      ) : (
                        <input
                          type={key === "DOB" ? "date" : "text"}
                          name={key}
                          value={value || ""}
                          onChange={handleChange}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2557a7] focus:border-[#2557a7]"
                        />
                      )
                    )
                  ) : (
                    Array.isArray(value) ? (
                      <div className="flex flex-wrap gap-2">
                        {value.map((skill, index) => (
                          <Button key={index} skill={skill} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">
                        {value === "N/A" ? "-" : value}
                      </p>
                    )
                  )}
                </div>
              ))}
          </div>

          <div className="flex justify-end mt-6 gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={saveData}
                  disabled={saving}
                  className={`px-4 py-2 text-sm text-white rounded-md ${saving ? "bg-gray-400" : "bg-[#2557a7] hover:bg-[#1e4c9a]"
                    } transition-colors duration-200`}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm text-white bg-[#2557a7] rounded-md hover:bg-[#1e4c9a] transition-colors duration-200"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;