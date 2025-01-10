import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginE = () => {
  const [info, setInfo] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    console.log(info);
    try {
      const response = await axios.post("http://localhost:8080/login/employeer", info);
      console.log(response);

      if (response) {
        localStorage.setItem('jwtToken', response.data.jwtToken);
        if (response.data.success) {
          setInfo({
            username: '',
            password: '',
          });
          navigate('/EDashboard'); // Redirect to dashboard
        }
      }
    } catch (error) {
      alert(error.response?.data?.msg || "An error occurred");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="form bg-red-500 text-black border-3">
          Login
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your Username"
              value={info.username}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={info.password}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}>Login!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginE;
