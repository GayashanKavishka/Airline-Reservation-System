import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";
import { useState, useEffect } from "react";
import{jwtDecode} from "jwt-decode"
import axios from "axios";
import user from "../../assets/Images/user.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState(false);
  const [name , setName] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken", accessToken);
    // if(accessToken){
    //   const decoded = jwtDecode(accessToken);
    //   console.log("decoded", decoded);
    // }
    axios
      .get("http://localhost:5174/register/", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        const decoded = jwtDecode(accessToken);
        console.log("decoded", decoded);
        setName(decoded.Name);
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  const handleSignInClick = () => {
    navigate("/singup"); // Navigate to the login page
  };

  const handleScheduleClick = () => {
    navigate("/schedule"); // Navigate to the schedule
  };

  const handleLogOutClick = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
    navigate("/");
  };
  const handleLogInClick=()=>{
    navigate("/login");
  }

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
                onClick={handleLogInClick}
              >
                <p>Log In</p>
              </button>
              <button
                className="px-3 py-1 rounded-md border-[2px] border-blue-400 border-solid blueShadow gap-4"
                onClick={handleSignInClick}
              >
                <p>Sign Up</p>
              </button>
            </>
          ) : (
            <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
            <p> <span style={{color:"yellow"}}>Logged :</span>{name}</p>
            <img src={user} alt="user" className="h-10 w-10 rounded-full"/>
            <button
              className="px-3 py-1 rounded-md border-[2px] border-blue-400 border-solid blueShadow gap-4"
              onClick={handleLogOutClick}
            >
              <p>Log out</p>
            </button>
            </div>
          )}
        </nav>
      </header>
    </AuthContext.Provider>
  );
};

export default Navbar;
