import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5174/register/", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  const handleSignInClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleScheduleClick = () => {
    navigate("/schedule"); // Navigate to the schedule
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <header className="header">
        <a href="/" className="logo">
          B Airways
        </a>

        <nav className="navbar flex items-center space-x-6">
          <a href="/">Home</a>
          <a href="/search-flight">Book</a>
          <a onClick={handleScheduleClick}>Flight Schedule</a>
          {!authState ? (
            <>
              <button
                className="px-3 py-1 rounded-md border-[2px] border-blue-400 border-solid blueShadow gap-4"
                onClick={handleSignInClick}
              >
                <p>Log In</p>
              </button>
              <button
                className="px-3 py-1 rounded-md border-[2px] border-blue-400 border-solid blueShadow gap-4"
                onClick={handleSignInClick}
              >
                <p>Sign In</p>
              </button>
            </>
          ) : (
            <button
              className="px-3 py-1 rounded-md border-[2px] border-blue-400 border-solid blueShadow gap-4"
              onClick={handleLogOutClick}
            >
              <p>Log out</p>
            </button>
          )}
        </nav>
      </header>
    </AuthContext.Provider>
  );
};

export default Navbar;
