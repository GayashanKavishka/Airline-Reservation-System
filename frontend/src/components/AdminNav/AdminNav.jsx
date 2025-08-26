import React, { useState } from 'react';
import { useAuth } from '../../helpers/AuthContext';
import LogoutConfirmation from '../LogoutConfirmation/LogoutConfirmation';
import './AdminNav.css'; // CSS file for styling

const AdminNav = () => {
  const [showReportsMenu, setShowReportsMenu] = useState(false);
  const [showAirplaneMenu, setShowAirplaneMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);
  const { logout, adminUser } = useAuth();

  const handleMouseEnter = () => {
    setShowReportsMenu(true);
  };

  const handleMouseEnterAirplane = () => {
    setShowAirplaneMenu(true);
  };

  const handleMouseEnterUser = () => {
    setShowUserMenu(true);
  };

  const handleMouseLeave = () => {
    setShowReportsMenu(false);
  };

  const handleMouseLeaveAirplane = () => {  
    setShowAirplaneMenu(false);
  };

  const handleMouseLeaveUser = () => {
    setShowUserMenu(false);
  };

  const handleLogoutClick = () => {
    setShowUserMenu(false);
    setShowLogoutConfirmation(true);
  };

  const handleLogoutConfirm = () => {
    setShowLogoutConfirmation(false);
    logout();
  };

  const handleLogoutCancel = () => {
    setShowLogoutConfirmation(false);
  };

  return (
    <>
        <div className="horizontal-menu">
        <div>
           <a href ="/" className='logo'>B Airways</a>
        </div>
        <div className='links'>
        <a href="/admin/dashboard">Dashboard</a>
        {/* <a href="/admin/airplane">Airplane</a> */}
        <div
            className='submenu'
            onMouseEnter={handleMouseEnterAirplane}
            onMouseLeave={handleMouseLeaveAirplane}
        >
          <a href="#">Airplanes</a>
            {showAirplaneMenu && (
            <div className="submenu-items">
                <a href="/admin/airplane">Aircrafts</a>
                <a href="/admin/model">Models</a>
            </div>
            )}
        </div>
        <div 
            className="submenu" 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave}
        >
            <a href="#">Reports</a>
            {showReportsMenu && (
            <div className="submenu-items">
                <a href="/admin/report1">Report 1</a>
                <a href="/admin/report2">Report 2</a>
                <a href="/admin/report3">Report 3</a>
                <a href ="/admin/report4">Report 4</a>
                <a href ="/admin/report5">Report 5</a>
            </div>
            )}
        </div>
        <a href="/admin/add-schedule">Flight Schedule</a>
        <a href="/admin/routes">Routes</a>
        <a href = "/admin/airport">Airports</a>
        
        {/* Admin User Menu */}
        <div 
            className="submenu admin-user-menu" 
            onMouseEnter={handleMouseEnterUser} 
            onMouseLeave={handleMouseLeaveUser}
        >
            <a href="#" className="admin-user">
              <span className="admin-icon">👤</span>
              {adminUser?.username || 'Admin'}
            </a>
            {showUserMenu && (
            <div className="submenu-items user-submenu">
                <button onClick={handleLogoutClick} className="logout-btn">
                  <span className="logout-icon">🚪</span>
                  Logout
                </button>
            </div>
            )}
        </div>
        </div>
        </div>
        
        {/* Logout Confirmation Modal */}
        <LogoutConfirmation 
          isOpen={showLogoutConfirmation}
          onConfirm={handleLogoutConfirm}
          onCancel={handleLogoutCancel}
        />
    </>
  );
};

export default AdminNav;
