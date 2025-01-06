import React, { useState } from 'react';
import './AdminLogin.css';
import AdminNav from '../../../components/AdminNav/AdminNav';
import axios from 'axios';


const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to the backend for login
      const response = await axios.get('http://localhost:5174/admin/login', {
        params: {
          username,
          password,
        },
      });

      if (response.data.success) {
        // Redirect to admin dashboard or some other page
          window.location.href = '/admin/dashboard';
      } else {
        setError(response.data.message); // Show the error message returned from the server
        alert('Invalid username or password');

      }
    } catch (err) {
      setError('Something went wrong. Please try again.'); // Handle any other errors
    }
  };



  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Add logic to handle login (e.g., API call)
  //   console.log('Admin Logged In:', { username, password });
  // };

  return (
    <div className='big'>
      <div className="login-container">
          <div className="login-box">
            <h2 className="login-title">Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className = "forgot-remember">
                <a href = "#">Forgot Password?</a>
                <div className='remember'>
                    <input type = "checkbox" id = "remember" />
                    <label htmlFor = "remember">Remember Me</label>
                </div>
              </div>
              <button type="submit" className="login-btn">Login</button>
            </form>
          </div>
        </div>
    </div>
  );
};

export default AdminLogin;
