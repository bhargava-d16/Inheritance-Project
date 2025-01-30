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
        const response = await axios.get(`http://localhost:8080/company/${username}`);
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
      await axios.put(`http://localhost:8080/company/${username}`, companyProfile, {
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
    <div className="w-50 bg-white shadow-lg rounded-lg p-6 mt-8 border border-[#CBDCEB]">
      <h2 className="text-2xl font-bold text-[#133E87] mb-4 text-center">Company Profile</h2>

      <div className="space-y-4">
        {Object.entries(companyProfile)
          .filter(([key]) => key !== "_id" && key !== "__v" && key !=="companypicurl")
          .map(([key, value]) => (
            <div key={key}>
              <label className="block text-[#133E87] font-medium capitalize">
                {key.replace(/([a-z])([A-Z])/g, "$1 $2")}:
              </label>
              {isEditing ? (
                
                key!=="email" && <input
                  type="text"
                  name={key}
                  value={value || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#CBDCEB] rounded-md bg-white focus:outline-none focus:ring focus:ring-[#608BC1]"
                />
              ) : (
                <p className="text-[#133E87]">{value || "N/A"}</p>
              )}
            </div>
          ))}
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>} {/* Show error message in UI */}

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

export default ProfileForm;