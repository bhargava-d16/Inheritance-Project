import { React, useState } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';

const Loginemp = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {dispatch}=useAuthContext()
  
  const emailChange = (event) => {
    setEmail(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5555/login/company', 
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if response.data exists and contains the token
      if (response.data && response.data.token) {
        
        localStorage.setItem('accessToken', JSON.stringify(response.data.token));
        localStorage.setItem('email', JSON.stringify(email));

        dispatch({type:'LOGIN',payload:response.data})
        toast.success('Login successful!');
        // Add navigation after successful login
        // navigate('/dashboard'); // Adjust the route as needed
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
  );
};

export default Loginemp;