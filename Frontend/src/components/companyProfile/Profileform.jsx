import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProfileForm = ( ) => {
  const [isEditing, setIsEditing] = useState(false);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  const {username} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/company/${username}`);
        setCompanyProfile(response.data);
      } catch (error) {
        setError(error.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [username]); 


  const handleChange = (e) => {
    setCompanyProfile((prevProfile) => ({
      ...prevProfile,
      [e.target.name]: Array.isArray(prevProfile?.[e.target.name])
        ? e.target.value.split(",").map((item) => item.trim())
        : e.target.value,
    }));
  };

  const saveData = async () => {
    if (!companyProfile) return;

    try {
      setSaving(true);
      await axios.put(`/api/company/${username}`, companyProfile, {
        headers: { "Content-Type": "application/json" },
      });

      setIsEditing(false);
    } catch (error) {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center text-[#133E87]">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!companyProfile) return <p className="text-center text-[#133E87]">No user data found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-[#2557a7] px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex justify-center">Company Profile</h2>
        </div>

        <div className="p-6">
          <div className="grid gap-6">
            {Object.entries(companyProfile)
              .filter(([key]) => key !== "_id" && key !== "__v" && key !== "notifications" && key!=="companypicurl")
              .map(([key, value]) => (
                <div key={key} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                  <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </label>
                  {isEditing && key !== "username" ? (
                    key === "hiring" ? (
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="hiring"
                            value="Yes"
                            checked={companyProfile.hiring === "Yes"}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#2557a7]"
                          />
                          <span className="text-sm text-gray-700">Yes</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="hiring"
                            value="No"
                            checked={companyProfile.hiring === "No"}
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
                            {value.map((tech, index) => (
                              <Button key={index} skill={tech} isEditing={isEditing} onRemove={onRemove} />
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
                          type="text"
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
                        {value.map((tech, index) => (
                          <Button key={index} skill={tech} />
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
                  className={`px-4 py-2 text-sm text-white rounded-md ${
                    saving ? "bg-gray-400" : "bg-[#2557a7] hover:bg-[#1e4c9a]"
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

export default ProfileForm;