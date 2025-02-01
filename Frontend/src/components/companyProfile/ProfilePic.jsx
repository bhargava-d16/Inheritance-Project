

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaUser } from 'react-icons/fa';
import { useParams } from "react-router-dom";

const ProfilePic = () => {
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/userassets/${username}`);
        setImg(response.data.profilepicurl);
      } catch (error) {
        setError(error.message || "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setImg(selectedFile);
  };

  const handleFileSave = async () => {
    if (img) {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilepic", img);
      formData.append("username", username);

      try {
        const response = await axios.post(
          `/api/saveprofilepic/${username}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setImg(response.data.url);
      } catch (error) {
        console.error("Upload failed:", error);
      } finally {
        setLoading(false);
        setEditing(false);
      }
    }
  };

  return (
    <div className="w-80 bg-white shadow-xl rounded-2xl p-8 border border-[#CBDCEB]">
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6">
          <div className="w-full h-full rounded-full overflow-hidden border-4 border-[#CBDCEB] shadow-lg">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#2557a7] border-t-transparent"></div>
              </div>
            ) : error ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <FaUser className="w-16 h-16 text-gray-300" />
              </div>
            ) : (
              <img
                src={typeof img === 'string' ? img : 'https://via.placeholder.com/200'}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="absolute bottom-2 right-2 p-3 bg-[#2557a7] text-white rounded-full shadow-lg"
            >
              <FaEdit className="w-5 h-5" />
            </button>
          )}
        </div>

        {editing && (
          <div className="w-full space-y-4">
            <label className="block">
              <div className="bg-[#2557a7] text-white py-3 px-4 rounded-lg cursor-pointer hover:bg-[#1e4c9a] transition-colors duration-200 text-center font-medium">
                Choose New Photo
                <input
                  type="file"
                  name="companypic"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </label>

            <div className="flex gap-3">
              <button
                onClick={handleFileSave}
                disabled={loading}
                className="flex-1 bg-[#2557a7] text-white py-2 px-4 rounded-lg hover:bg-[#1e4c9a] transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Uploading...
                  </span>
                ) : (
                  'Upload'
                )}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePic;
