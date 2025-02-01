import { React, useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useAuthContext } from "../../../hooks/useAuthContext";
import AuthNav from "../Navbars/AuthNav";

const Loginemp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useAuthContext();

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
        "https://inheritance-project-4kr9.onrender.com/login/company",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.token) {
        console.log("skduf", response.data);
        localStorage.setItem("accessToken", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("User", "Company");

        dispatch({ type: "LOGIN", payload: response.data });
        toast.success("Login successful!");
        navigate("/Edashboard");
      } else {
        toast.error("Invalid response from server");
        console.error("Invalid response structure:", response.data);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        toast.error(error.response.data.message || "Login failed");
      } else if (error.request) {
        console.error("No Response Received:", error.request);
        toast.error(
          "No response from the server. Please check your connection."
        );
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
          backgroundSize: "4rem 4rem",
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
                <Link to="/register/employer" className="auth-link">
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

export default Loginemp;
