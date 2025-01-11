// import React, { useState, useContext } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as yup from "yup";
// import axios from "axios";
// import "./Loginpage.css";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../../helpers/AuthContext";
// import Navbar from "../Navbar/Navbar";

// function Loginpage() {
//   const [isSignUpMode, setIsSignUpMode] = useState(false);
//   const { isAuthenticated } = useContext(AuthContext);

//   const handleSignUpClick = () => setIsSignUpMode(true);
//   const handleSignInClick = () => setIsSignUpMode(false);

//   const {setAuthState} = useContext(AuthContext);
//   //const [authState, setAuthState] = useState(false);

//   let navigate = useNavigate();

//   // Validation schema for sign-in form
//   const signInSchema = yup.object().shape({
//     username: yup
//       .string()
//       .min(5, "Username must be at least 5 characters")
//       .required("Username is required"),
//     password: yup
//       .string()
//       .min(4, "Password must be at least 4 characters")
//       .max(30, "Password can't exceed 30 characters")
//       .required("Password is required"),
//   });

//   // Validation schema for sign-up form
//   const signUpSchema = yup.object().shape({
//     firstName: yup.string().required("First name is required"),
//     secondName: yup.string().required("Second name is required"),
//     username: yup
//       .string()
//       .min(5, "Username must be at least 5 characters")
//       .required("Username is required"),
//     email: yup.string().email("Invalid email").required("Email is required"),
//     password: yup
//       .string()
//       .min(4, "Password must be at least 4 characters")
//       .max(30, "Password can't exceed 30 characters")
//       .required("Password is required"),
//     country: yup.string().required("Country is required"),
//     dob: yup.date().required("Date of Birth is required"),
//     address: yup.string().required("Address is required"),
//     city: yup.string().required("City is required"),
//     gender: yup.string().required("Gender is required"),
//     phone: yup
//       .string()
//       .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
//       .required("Phone number is required"),
//   });

//   const handleSignInSubmit = (data) => {
//     axios.post("http://localhost:3001/auth/signin", data).then((response) => {
//       console.log("Sign-in data submitted", response.data);
//     });
//   };

//   const handleSignUpSubmit = () => {
//     // console.log("Sign-up data: ", data);

//     console.log("Sign-up data: ");

//     // axios
//     //   .post("http://localhost:5174/user/signup", data)
//     //   .then((response) => {
//     //     if (response.data.error) {
//     //       alert(response.data.error);
//     //     } else {
//     //       // localStorage.setItem("accessToken", response.data.accessToken );
//     //       console.log("Sign-up data submitted", response.data);
//     //       navigate("/");
//     //     }
//     //   })
//     //   .catch((error) => {
//     //     console.error("Error during sign-up: ", error);
//     //   });
//   };

//   const handleAdminLogIn = (data) => {
//     axios
//       .post("http://localhost:5174/admin/adminlog", data)
//       .then((response) => {
//         if (response.data.error) {
//           alert(response.data.error);
//         } else {
//           localStorage.setItem("accessToken", response.data.accessToken);
//           console.log("Logged In", response.data);
//           navigate("/");
//         }
//       });
//     // .catch((error) => {
//     //   console.error("Login error:", error.response ? error.response.data : error.message);
//     //   alert("Login failed. Please try again.");
//     // });
//   };

//   const handleGuest = () => {
//     navigate("/search-flight");
//   };

//   const handleLogInSubmit = (data) => {
//     axios
//       .post("http://localhost:5174/register/login", data)
//       .then((response) => {
//         if (response.data.error) {
//           alert(response.data.error);
//         } else {
//           localStorage.setItem("accessToken", response.data.accessToken);
//           console.log("Logged In", response.data);
//           setAuthState(true);
//           navigate("/");
//         }
//       });
//     // .catch((error) => {
//     //   console.error("Login error:", error.response ? error.response.data : error.message);
//     //   alert("Login failed. Please try again.");
//     // });
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
//         <div className="forms-container">
//           <div className="signin-signup">
//             {/* Sign-in Form */}
//             <Formik
//               initialValues={{ username: "", password: "" }}
//               validationSchema={signInSchema}
//               onSubmit={handleLogInSubmit}
//             >
//               <Form className="sign-in-form">
//                 <h2 className="title text-4xl font-semibold text-gray-200">
//                   Log in
//                 </h2>
//                 <div className="input-field">
//                   <i className="fas fa-user"></i>
//                   <Field
//                     className="LoginInput"
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                   />
//                   <ErrorMessage
//                     name="username"
//                     component="div"
//                     className="error-message"
//                   />
//                 </div>
//                 <div className="input-field">
//                   <i className="fas fa-lock"></i>
//                   <Field
//                     className="LoginInput"
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="error-message"
//                   />
//                 </div>
//                 <input
//                   type="submit"
//                   value="Login"
//                   className="bg-blue-400 px-10 py-2 rounded-md border-[2px] border-blue-400 border-solid ease-in-out font-semibold"
//                 />
//                 <button
//                   onClick={handleGuest}
//                   className="bg-blue-400 px-10 mt-5 py-2 rounded-full border-[2px] border-blue-400 border-solid ease-in-out font-semibold"
//                 >
//                   Continue as Guest
//                 </button>
//               </Form>
//             </Formik>

//             {/* Sign-up Form */}
//             <Formik
//               initialValues={{
//                 firstName: "",
//                 secondName: "",
//                 username: "",
//                 email: "",
//                 password: "",
//                 country: "",
//                 dob: "",
//                 address: "",
//                 city: "",
//                 gender: "",
//                 phone: "",
//               }}
//               validationSchema={signUpSchema}
//               // onSubmit={handleLogInSubmit}
//               onSubmit={handleSignUpSubmit()}
//             >
//               <Form className="sign-up-form">
//                 <h2 className="title text-4xl font-semibold text-gray-200">
//                   Sign up
//                 </h2>

//                 <div className="input-field-row">
//                   <div className="input-field">
//                     <i className="fas fa-user"></i>
//                     <Field
//                       className="LoginInput"
//                       type="text"
//                       name="firstName"
//                       placeholder="First Name"
//                     />
//                     <ErrorMessage
//                       name="firstName"
//                       component="span"
//                       className="error-message"
//                     />
//                   </div>
//                   <div className="input-field">
//                     <i className="fas fa-user"></i>
//                     <Field
//                       className="LoginInput"
//                       type="text"
//                       name="secondName"
//                       placeholder="Last Name"
//                     />
//                     <ErrorMessage
//                       name="secondName"
//                       component="span"
//                       className="error-message"
//                     />
//                   </div>
//                 </div>

//                 <div className="input-field">
//                   <i className="fas fa-user"></i>
//                   <Field
//                     className="LoginInput"
//                     type="text"
//                     name="username"
//                     placeholder="Username"
//                   />
//                   <ErrorMessage
//                     name="username"
//                     component="div"
//                     className="error-message"
//                   />
//                 </div>

//                 <div className="input-field">
//                   <i className="fas fa-envelope"></i>
//                   <Field
//                     className="LoginInput"
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                   />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="error-message"
//                   />
//                 </div>

//                 <div className="input-field">
//                   <i className="fas fa-lock"></i>
//                   <Field
//                     className="LoginInput"
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="error-message"
//                   />
//                 </div>

//                 <div className="input-field-row">
//                   <div className="input-field">
//                     <i className="fas fa-flag"></i>
//                     <Field
//                       className="LoginInput"
//                       type="text"
//                       name="country"
//                       placeholder="Country"
//                     />
//                     <ErrorMessage
//                       name="country"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>

//                   <div className="input-field">
//                     <i className="fas fa-calendar"></i>
//                     <Field
//                       className="LoginInput"
//                       type="date"
//                       name="dob"
//                       placeholder="Date of Birth"
//                       style={{ color: "black" }}
//                     />
//                     <ErrorMessage
//                       name="dob"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>
//                 </div>

//                 <div className="input-field-row">
//                   <div className="input-field">
//                     <i className="fas fa-address-card"></i>
//                     <Field
//                       className="LoginInput"
//                       type="text"
//                       name="address"
//                       placeholder="Address"
//                     />
//                     <ErrorMessage
//                       name="address"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>

//                   <div className="input-field">
//                     <i className="fas fa-city"></i>
//                     <Field
//                       className="LoginInput"
//                       type="text"
//                       name="city"
//                       placeholder="City"
//                     />
//                     <ErrorMessage
//                       name="city"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>
//                 </div>

//                 <div className="input-field-row">
//                   <div className="input-field">
//                     <i className="fas fa-venus-mars"></i>
//                     <Field className="LoginInput" as="select" name="gender">
//                       <option value="">Select Gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </Field>
//                     <ErrorMessage
//                       name="gender"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>

//                   <div className="input-field">
//                     <i className="fas fa-phone"></i>
//                     <Field
//                       className="LoginInput"
//                       type="text"
//                       name="phone"
//                       placeholder="Phone Number"
//                     />
//                     <ErrorMessage
//                       name="phone"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>
//                 </div>

//                 <input
//                   type="submit"
//                   className="bg-blue-400 px-10 py-2 rounded-md border-[2px] border-blue-400 border-solid ease-in-out blueShadowBig font-semibold"
//                   value="Sign up"
//                 />
//               </Form>
//             </Formik>
//           </div>
//         </div>

//         <div className="panels-container">
//           <div className="panel left-panel">
//             <div className="content">
//               <h3>New here ?</h3>
//               <p>
//                 Create an account with us today! Enjoy easy bookings, exclusive
//                 offers, and stay updated with the latest travel news. Join our
//                 community now and elevate your travel experience!
//               </p>
//               <button
//                 onClick={handleSignUpClick}
//                 className="btn transparent"
//                 id="sign-up-btn"
//               >
//                 Sign up
//               </button>
//             </div>
//             <img src="img/log.svg" className="image" alt="" />
//           </div>
//           <div className="panel right-panel">
//             <div className="content">
//               <h3>One of us ?</h3>
//               <p>
//                 Log in to your account here for quick access to bookings,
//                 updates, and exclusive offers.
//               </p>
//               <button
//                 onClick={handleSignInClick}
//                 className="btn transparent"
//                 id="sign-in-btn"
//               >
//                 Sign in
//               </button>
//             </div>
//             <img src="img/register.svg" className="image" alt="" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Loginpage;



import React from "react";
import { useState  } from "react";
import {useNavigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import "./Loginpage.css"; // Create a CSS file for styling
import logo from "../../assets/Images/Plane.png"; // Add your logo image here
import Navbar from "../Navbar/Navbar";

const Loginpage = () => {
   const [userName, setUserName] = useState("");
   const [password, setPassword] = useState("");

   const navigate = useNavigate();

   const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:5174/register/login`,{
      username : userName,
      password : password
    })
    .then((res)=>{
      console.log(res.data);
      alert("User Logged in Successfully");
      const token = res.data.token;
      console.log("access",token);
      localStorage.setItem("accessToken", token);
      navigate("/");
    }
    )
    .catch((err)=>{
      console.log(err);
      if(err.response.status === 400){
        alert("Username and password are required.");
      }
      else if(err.response.status === 501){
        alert("Invalid username or Password");
      }
      else{
        alert("Login Failed");
      }
    });
    }
  
   


  return (
    <div className="login-page-container">
      <Navbar />
      <div className="login-left">
        <div className="logo-container">
          <img
            src= {logo}
            alt="Mora-Click Logo"
            className="logo-image"
          />
        </div>
        <h1 className="wel">Welcome to <span className="s">B Airways!</span> </h1>
        {/* <p className="intro-text">
          Your one-stop solution for seamless campus engagement. Log in to
          access personalized resources, manage your academic activities, and
          stay updated with the latest university news.
        </p> */}
        <p className = "wwww" style = {{color:"white",fontWeight:"bold"}}>
      Login Gets <span style={{color:"blue"}}>Rewads</span> and <span style={{color:"blue"}}>Discounts !</span> 
        </p>
        <p className="cta-text">Login Gets <span style={{color:"blue"}}>Rewads</span> and <span style={{color:"blue"}}>Discounts</span></p>
      </div>

      {/*Right Section */}
     <div className="login-right-container">
      <div className="login-right">
        <h2>LOGIN</h2>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor="username" className=" te">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter the username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{color: "black"}}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className=" te" >Password</label>
            <div className="password-container">
              <input
                type="password"
                id="password"
                placeholder="Enter the password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{color: "black"}}
              />
            </div>
          </div>
          <button type="submit" className="login_button" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <p className="signup-text">
          Do you haven’t account? <a href="/singup">Sign up</a>
        </p>
      </div>
    </div>
    </div>
  );
};
export default Loginpage;





