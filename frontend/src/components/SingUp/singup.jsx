import React from "react";
import { useState  } from "react";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import "./singup.css"; // Create a CSS file for styling
import logo from "../../assets/Images/Plane.png"; // Add your logo image here
import Navbar from "../Navbar/Navbar";

const SingUp = () => {
   const [userName, setUserName] = useState("");
   const [password, setPassword] = useState("");
   const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    dob: "",
    address: "",
    city: "",
    email: "",
    gender: "",
    phone: "",
   });

   const navigate = useNavigate();

   const isFormValid = () => {
    return Object.values(formData).every((field) => field.trim() !== '');
  };

   const handleSubmit = (e) => {
    if(!isFormValid()){return alert("Please fill all the fields");}
    e.preventDefault();
    console.log(formData,userName,password);
    axios.post(`http://localhost:5174/register/register`,{
      FirstName : formData.firstName,
      LastName : formData.lastName,
      Country : formData.country,
      DOB : formData.dob,
      Address : formData.address,
      City : formData.city,
      Email : formData.email,
      Gender : formData.gender,
      Phone : formData.phone,
      UserName : userName,
      Password : password

   })
   .then((res)=>{
      console.log(res.data);
      alert("User Registered Successfully");
      navigate("/login");
   })
   .catch((err)=>{
      console.log(err);
      alert("User Registration Failed");
   });
  
   }

   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
   };


  return (
    <div>
    <Navbar />
    <div className="login-page-container">
      <div className="login-left">
        <div className="logo-container">
          <img
            src= {logo}
            alt="Mora-Click Logo"
            className="logo-image"
          />
        </div>
        <h1 className="wel1">Welcome to <span className="s">B Airways!</span> </h1>
        {/* <p className="intro-text">
          Your one-stop solution for seamless campus engagement. Log in to
          access personalized resources, manage your academic activities, and
          stay updated with the latest university news.
        </p> */}
         {/* <p className="intro-text">
          Empowering students and enriching the university experience with
          innovation and connectivity.
        </p>  */}
        <p className="tttt" style = {{color:"white",fontWeight:"bold"}} >Gather with us to experience unbelivealble discounts</p>
      </div>

      {/*Right Section */}
     <div className="sing-right-container">
      <div className="sing-right">
        <h2>Sing up</h2>
        <form className="sing-form">
          <div className="input-container">
            <div className="names">
                <lable>First Name</lable>
                <input
                type="text"
                name = "firstName"
                onChange={handleChange}
                placeholder="First Name"
                value={formData.firstName}
                
                />
            </div>
            <div className="names">
                <lable>Second Name</lable>
                <input
                   type="text"
                   placeholder="Last Name"
                   name = "lastName"
                   onChange={handleChange}
                   value={formData.lastName}
                />
            </div>
          </div>
          <div className="input-container">
            <div className="names">
                <lable>Country</lable>
                <input
                type="text"
                placeholder="Country"
                name = "country"
                onChange = {handleChange}
                value={formData.country}
                
                />
            </div>
            <div className="names">
                <lable>Date of Birth</lable>
                <input
                   type="date"
                   placeholder="DOB"
                   value={formData.dob}
                   name = "dob"
                   onChange={handleChange}
                />
            </div>
          </div>
          <div className="input-container">
            <div className="address" >
                <lable>Address</lable>
                <input
                type="text"
                placeholder="Address"
                style={{width:"320px"}}
                value={formData.address}
                name = "address"
                onChange={handleChange}
                
                />
            </div>
          </div>
          <div className="input-container">
            <div className="names">
                <lable>City</lable>
                <input
                type="text"
                placeholder="City"
                value={formData.city}
                name = "city"
                onChange={handleChange}
                
                />
            </div>
            <div className="names">
                <lable>Email</lable>
                <input
                   type="text"
                   placeholder="Email"
                  value={formData.email}
                  name = "email"
                  onChange={handleChange}
                />
            </div>
          </div>
          <div className="input-container">
            <div className="names">
                <lable>Phone number</lable>
                <input
                type="text"
                placeholder="Country"
                value={formData.phone}
                name = "phone"
                onChange={handleChange}
                />
            </div>
            <div className="names">
                <lable>Gender</lable>
                <select
                  value={formData.gender}
                  name = "gender"
                  onChange={handleChange}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
          </div>
          <div className="input-container">
            <div className="names">
                <lable>User Name</lable>
                <input
                type="text"
                placeholder="User Name"
                value = {userName}
                onChange={(e) => setUserName(e.target.value)}
                
                />
            </div>
            <div className="names">
                <lable>Password</lable>
                <input
                   type="text"
                   placeholder="Password"
                   value = {password}
                   onChange={(e)=>{setPassword(e.target.value)}}
                />
            </div>
          </div>
          <button type="submit" className="sing_button" onClick={handleSubmit}>
            Sing up
          </button>
          <p className="login-text">
          Do you have a account? <a href="/login">Log in </a>
        </p>
        </form>
        
      </div>
    </div>
    </div>
    </div>
  );
};
export default SingUp;