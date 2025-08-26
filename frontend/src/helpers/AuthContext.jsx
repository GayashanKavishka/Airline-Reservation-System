import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  const loginAsAdmin = (userData = null) => {
    setIsAdmin(true);
    setIsAuthenticated(true);
    if (userData) {
      setAdminUser(userData);
      localStorage.setItem("adminUser", JSON.stringify(userData));
    }
    localStorage.setItem("isAdmin", "true");
  };

  const logout = () => {
    setIsAdmin(false);
    setIsAuthenticated(false);
    setAdminUser(null);
    
    // Clear all admin-related data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminUser");
    
    // Redirect to admin login page
    window.location.href = "/admin/login";
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setAdminUser(null);
    
    // Clear user-related data from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userToken");
    
    // Redirect to home page
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const adminToken = localStorage.getItem("adminToken");
    const isAdminStored = localStorage.getItem("isAdmin");
    const adminUserStored = localStorage.getItem("adminUser");
    
    setIsAuthenticated(!!(token || adminToken));
    
    if (isAdminStored === "true" && adminToken) {
      setIsAdmin(true);
      if (adminUserStored) {
        setAdminUser(JSON.parse(adminUserStored));
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isAdmin,
        adminUser,
        loginAsAdmin,
        logout,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
