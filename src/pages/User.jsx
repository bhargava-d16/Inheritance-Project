// import React from 'react'
// import UserNav from '../components/User/userNav'
// import JobList from '../components/Jobs/JobList';
// import UserPage from '../components/User/UserPage'
// import Footer from '../components/Others/Footer'


// const User = () => {
//   return (
//     <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
//         <UserNav/>
//         <JobList jobs={jobs} loading={loading} />
//         <UserPage/>
//         <Footer />
//     </div>
//   )
// }

// export default User

import React, { useState, useEffect } from 'react';
import UserNav from '../components/User/userNav';
import UserPage from '../components/User/UserPage';
import Footer from '../components/Others/Footer';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';


const User = () => {
  const {user}=useAuthContext()
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:8080/jobs',{
          
            headers:{
  
              "authorization":`Bearer ${user.token}`
              
            }
          }
        );
        console.log('API Response:', response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    if(user){
      fetchJobs();
    }
  }, []);

  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      <UserNav />
      <UserPage jobs={jobs} loading={loading} />
      <Footer />
    </div>
  );
};

export default User;