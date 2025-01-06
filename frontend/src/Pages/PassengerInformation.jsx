import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar/Navbar";

const PassengerInfo = () => {
  const { state } = useLocation();
  const { flight, travelClass } = state;
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [country, setCountry] = useState("");
  const [DOB, setDOB] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formDisabled, setFormDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetchDetails = async () => {
      const token = localStorage.getItem("accessToken");
      
      if (token) {
        try {
          // First verify the token
          const response = await axios.get("http://localhost:5174/user/details", {
            headers: {
              accessToken: token,
            },
          });

          if (response.data && !response.data.error) {
            setIsAuthenticated(true);
            // Auto-fill form with user details
            const userData = response.data;
            setFName(userData.FirstName);
            setLName(userData.SecondName);
            setCountry(userData.Country);
            setDOB(userData.DOB ? userData.DOB.split('T')[0] : '');
            setAddress(userData.Address);
            setCity(userData.City);
            setGender(userData.Gender.toLowerCase());
            setEmail(userData.Email);
            setPhone(userData.Phone_number);
            
            // Keep form disabled for authenticated users
            setFormDisabled(true);
          } else {
            setFormDisabled(false);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          setFormDisabled(false);
        }
      } else {
        setFormDisabled(false);
      }
    };

    checkAuthAndFetchDetails();
  }, []);

  const handleBooking = async () => {
    const passengerInfo = {
      fname,
      lname,
      country,
      DOB,
      address,
      city,
      gender,
      email,
      phone,
    };

    localStorage.setItem('bookingInfo', JSON.stringify({
      passengerInfo,
      flightDetails: state.flight,
      classType: state.travelClass
    }));

    // Navigate to ticket page
    navigate("/ticket-view");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      <Navbar />
      <div className="h-24"></div>
      <div className="bg-white/10 backdrop-blur-md mb-10 mt-10 py-20 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {isAuthenticated ? "Confirm Your Information" : "Enter Passenger Information"}
        </h2>
        <div className="space-y-4 px-10">
          <label className="text-lg text-white font-medium">First Name :</label>
          <input
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFName(e.target.value)}
            className="w-full px-4 py-2 text-black bg-white border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={formDisabled}
            required
          />
          <label className="text-lg text-white font-medium">Last Name :</label>
          <input
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLName(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={formDisabled}
            required
          />
          <label className="text-lg text-white font-medium">Country :</label>
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={formDisabled}
            required
          />
          <label className="text-lg text-white font-medium">Date of Birth :</label>
          <input
            type="date"
            placeholder="Date of Birth"
            value={DOB}
            onChange={(e) => setDOB(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={formDisabled}
            required
          />
          <label className="text-lg text-white font-medium">Address :</label>
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={formDisabled}
            required
          />
          <label className="text-lg text-white font-medium">City :</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={formDisabled}
            required
          />
          <label className="text-lg text-white font-medium">Email :</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={formDisabled}
            required
          />
          <label className="text-lg text-white font-medium">Select Gender :</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 bg-white text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={formDisabled}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <label className="text-lg text-white font-medium">Phone Number :</label>
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white px-4 py-2 text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            pattern="[0-9]{10}"
            disabled={formDisabled}
            required
          />
          <button
            onClick={handleBooking}
            className="w-full mt-5 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default PassengerInfo;