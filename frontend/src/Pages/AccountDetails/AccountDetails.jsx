import React, { useEffect, useState } from "react";
import { use } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AccountDetails = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    country: "USA",
    dateOfBirth: "1995-06-15",
    email: "john.doe@example.com",
    phoneNumber: "1234567890",
    city: "New York",
    address: "123 Main Street",
    userName: "johndoe",
    password: "password123",
  });

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);

  const [accesssToken, setAccessToken] = useState("");
  const [passengerID, setPassengerID] = useState("");

//   setAccessToken(localStorage.getItem("accessToken"));

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Toggle editing mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Submit changes
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Details:", formData);
    setIsEditing(false);
  };

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  useEffect(() => {
    // Fetch user details
    if (accesssToken) {
       console.log(accesssToken);
       setPassengerID(jwtDecode(accesssToken).passengerId);
    }
    else{
      console.log("No access token found");
    }
  },[accesssToken])

  useEffect(() => {
    // Fetch user details
    if (passengerID) {
      console.log("Passenger ID:", passengerID);
      axios.get( `http://localhost:5174/user/get/passengerdetails?Passenger_ID=${passengerID}`)
      .then((response) => {
        console.log("User Details:", response.data);
        const dob = new Date(response.data.DOB).toISOString().split("T")[0];
        setFormData(
            (prevState) => ({
                ...prevState,
                firstName: response.data.FirstName,
                lastName: response.data.SecondName,
                country: response.data.Country,
                dateOfBirth: dob,
                email: response.data.Email,
                phoneNumber: response.data.Phone_number,
                city: response.data.City,
                address: response.data.Address,
                userName: response.data.Username,
                password: "********",
            })
        )
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
    }
    else{
        console.log("No passenger ID found");
        }

  },[passengerID])

  // function to  update passenger 


  const HandleSave = (e) => {
    e.preventDefault();
    console.log("Updated Details:", formData);
    axios.put(`http://localhost:5174/user/update/passenger`,{
      passwordID: passengerID,
      firstName : formData.firstName,
      lastName : formData.lastName,
      Country : formData.country,
      DOB : formData.dateOfBirth,
      Address : formData.address,
      City : formData.city,
      Email : formData.email,
      phone_num : formData.phoneNumber,
      username : formData.userName,
      password : formData.password
    })
    .then((res)=>{
      console.log(res.data);
      alert("User Updated Successfully");
    })
    .catch((err)=>{
      console.log(err);
      alert("User Updation Failed");
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <div
        style={{
          backgroundColor: "#1c1c1c",
          borderRadius: "10px",
          padding: "30px",
          width: "80%",
          maxWidth: "600px",
          boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" ,color:"#fff",fontSize:"30px",fontFamily:"poppins",fontWeight:"bold"}}>
          Account Details
        </h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} style={{ marginBottom: "15px" }}>
              <label
                htmlFor={key}
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
              <input
                type={key === "password" ? "password" : "text"}
                name={key}
                id={key}
                value={formData[key]}
                onChange={handleChange}
                disabled={!isEditing}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: isEditing ? "#fff" : "#333",
                  color: isEditing ? "#000" : "#fff",
                  outline: "none",
                  transition: "background-color 0.3s ease",
                }}
              />
            </div>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={toggleEdit}
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#444",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    backgroundColor: "#4CAF50",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease",

                 
                  }}
                 onClick = {HandleSave} 
                >
                  Save
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={toggleEdit}
                style={{
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
