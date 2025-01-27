// import React from 'react'
// import { useState } from 'react'
// import axios from 'axios'
// import { Navigate, useNavigate } from 'react-router-dom'

// const LoginJs = () => {
//   const [info, setInfo] = useState({
//     username:'',
//     password:''
//   })
//   const navigate=useNavigate();

//   const handleChange=(e) => {
//     setInfo({ ...info, [e.target.name]: e.target.value });
//   }

//   const handleSubmit=async()=>{
//     console.log(info);
//     try {
//       const response=await axios.post("http://localhost:8080/login/jobseeker",info)
//       console.log(response);
//       if(response.data.success){
//         setInfo({
//           username:'',
//           password:''
//         }) 
//         navigate('/JSDashboard')
//       }
//     } catch (error) {
//       alert(error.response.data.msg||error.response.data.error.details[0].message)

//       console.log(error)
//     }
//   }
//   return (
//     <div>
//       <div className="container">
//         <div className='form bg-red-500 text-black border-3'>
//           Login
//           <form onSubmit={(e) => e.preventDefault()}>
//             <label htmlFor="username">Username</label>
//             <input type="text" name="username" placeholder='Enter your Username' value={info.username} onChange={(e) => handleChange(e)} />
//             <input type="password" name="password" placeholder='Enter your password ' value={info.password} onChange={(e) => handleChange(e)} />
//             <button onClick={handleSubmit}>Login!</button>
//           </form>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LoginJs

import { React, useState } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useAuthContext } from '../../../hooks/useAuthContext';
import AuthNav from '../Navbars/AuthNav';


const Loginuser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {dispatch}=useAuthContext()
  //  const {user}=useAuthContext()
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8080/login/user', 
        { email, password },
        {
          headers: {
            
            'Content-Type': 'application/json',
            //  'authorization':`Bearer ${user.token}`
          }
        }
      );

      // Check if response.data exists and contains the token
      if (response.data && response.data.token) {
        
        localStorage.setItem('accessToken', response.data.token);
        

        dispatch({type:'LOGIN',payload:response.data.token})
        toast.success('Login successful!');
        
        navigate('/user')
        console.log("hello job")
      } else {
        toast.error('Invalid response from server');
        console.error('Invalid response structure:', response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        toast.error(error.response.data.message || 'Login failed');
      } else if (error.request) {
        console.error("No Response Received:", error.request);
        toast.error("No response from the server. Please check your connection.");
      } else {
        console.error("Unexpected Error:", error.message);
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `
          linear-gradient(to right, #e5e7eb 1px, transparent 1px),
          linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
        `,
        backgroundSize: '4rem 4rem'
      }}
    >

    <AuthNav />
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <h1>Login</h1>
          </div>
          <div className="auth_item">
            <label htmlFor="email">Email*</label>
            <input 
              onChange={emailChange}
              id="email"
              type="email"
              placeholder="Enter your email"
              required
              value={email}
            />
          </div>
          <div className="auth_item">
            <label htmlFor="password">Password*</label>
            <input
              onChange={passwordChange}
              id="password"
              type="password"
              placeholder="Enter your password"
              required
              value={password}
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
          <div className="auth_footer">
            <Link to='/register/employer' className="auth-link">
              Don't have an account? Register
            </Link>
          </div>
        </div>
        
      </form>
    </div>
    </div>
    </div>
  );
};

export default Loginuser;
