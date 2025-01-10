// import React, { useState, useEffect } from "react";
// // import axios from 'axios'



// const UserProfile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [userProfile, setUserProfile] = useState()

//   useEffect(() => {
//     fetch("http://localhost:8080/user/jhon123")
//       .then((response) => response.json())
//       .then((data) => setUserProfile(data))
//       .catch((error) => console.error("Error fetching users:", error));
//   }, []);


//   const handleChange = (e) => {
//     setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Profile & Resume</h2>

//       <div className="space-y-4">
//         {Object.keys(userProfile).map((key) => (
//           <div key={key}>
//             <label className="block text-gray-600 font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</label>
//             {isEditing ? (key != "username" &&
//               <input
//                 type="text"
//                 name={key}
//                 value={userProfile[key]}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
//               />
//             ) : (
//               <p className="text-gray-700">{userProfile[key]}</p>
//             )}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => setIsEditing(!isEditing)}
//         className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition"
//       >
//         {isEditing ? "Save Changes" : "Edit Profile"}
//       </button>
//     </div>
//   );
// };

// export default UserProfile;







////////////////////////////////////////////////////////////////





import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/user/jhon123")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        return response.json();
      })
      .then((data) => {
        setUserProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [e.target.name]: e.target.value,
    }));
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!userProfile) return <p className="text-center text-gray-500">No user data found.</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Profile & Resume</h2>

      <div className="space-y-4">
        {Object.keys(userProfile).map((key) => (
          key !== "_id"  && key !== "__v" && (
            <div key={key}>
              <label className="block text-gray-600 font-medium capitalize">
                {key.replace(/([A-Z])/g, " $1")}:
              </label>
              {isEditing && key !== "username"   ? ( // Prevent editing username
                <input
                  type="text"
                  name={key}
                  value={userProfile[key] || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
                />
              ) : (
                <p className="text-gray-700">{userProfile[key]}</p>
              )}
            </div>
          )
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
