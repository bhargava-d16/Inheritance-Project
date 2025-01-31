import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaUser, FaTrashAlt } from 'react-icons/fa';
import { useParams } from "react-router-dom";

const ProfilePic = () => {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [change, setChange] = useState(false);
  const {username} = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/company/${username}`);
        console.log(response.data)
        setImg(response.data.companypicurl);
      } catch (error) {
        setError(error.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [change]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImg(selectedFile);
  }

  const handleFileSave = async () => {
    if (img) {
      setLoading(true);
      const formData = new FormData();
      formData.append("companypic", img);
      formData.append("username", username);
      try {
        const response = await axios.post(`/api/savecompanypic/${username}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        console.log("Image uploaded:", response.data.companypicurl);
        setImg(response.data.companypicurl)
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setLoading(false)
        setEditing(false)
      }
    }
  };



  return (
    <div className="w-72 h-72 bg-white shadow-lg mt-8 rounded-lg p-6 border border-[#CBDCEB] flex items-center justify-center flex-col">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {/* Profile Picture */}
          <img
            src={img}
            alt="Profile Pic"
            className="w-34 h-34 rounded-full object-cover mb-4"
          />

          {/* Edit Mode */}
          {editing ? (
            <div className="flex flex-col items-center">
              <input
                type="file"
                name="companypic"
                accept="image/*"
                onChange={handleFileChange}
                className="w-36 h-10 p-2 text-sm border border-gray-300 rounded-lg mb-4"
              />
              <div className="flex flex-row justify-between items-center">
                <button
                  onClick={handleFileSave}
                  className="bg-blue-600 text-white py-1 px-4 rounded-lg hover:bg-blue-700"
                  disabled={loading}
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-300 text-black py-1 px-4 rounded-lg hover:bg-gray-400 ml-3"
                  disabled={loading}

                >
                  Cancel
                </button>
              </div>

            </div>
          ) : (
            <div className="object-bottom ml-48 mt-12 ">

              <button
                onClick={() => setEditing(true)}

              >
                {/* Edit */}
                <FaEdit size={30} style={{ color: '133e87' }} />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePic;