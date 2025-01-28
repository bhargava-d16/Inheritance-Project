import { React, useState } from "react";
import "./auth.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useAuthContext } from "../../hooks/useAuthContext";

const Registeremp = () => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuthContext();

  const nameChange = (event) => {
    setName(event.target.value);
  };
  const emailChange = (event) => {
    setEmail(event.target.value);
  };
  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5555/register/company",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.data && response.data.token) {
        localStorage.setItem("accessToken",JSON.stringify(response.data.token));
        localStorage.setItem("email", JSON.stringify(email));

        dispatch({ type: "LOGIN", payload: response.data });
        toast.success("User registered successfully!");
        // Add navigation after successful login
        // navigate('/dashboard'); // Adjust the route as needed
      } else {
        toast.error("Invalid response from server");
        console.error("Invalid response structure:", response.data);
      }

      navigate("/login/jobseeker");
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data.message); // Log error message
        toast.error(error.response.data.message);
      } else if (error.request) {
        console.error("No Response Received:", error.request);
        toast.error("No response from the server.");
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
            <h1>Register</h1>
          </div>
          <div className="auth_item">
            <label htmlFor="username">Name*</label>
            <input
              onChange={nameChange}
              id="name"
              type="text"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="auth_item">
            <label htmlFor="email">Email*</label>
            <input
              onChange={emailChange}
              id="email"
              type="email"
              placeholder="Enter your email"
              required
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
            />
          </div>
          <button type="submit" className="auth-button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registeremp;
