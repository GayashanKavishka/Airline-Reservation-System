import React, { useState,useEffect } from 'react';
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import axios from 'axios';
import { use } from 'react';

const PassangerDetails = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        country: '',
        dob: '',
        address: '',
        city: '',
        email: '',
        gender: '',
        phone: ''
      });

    const {seat} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // const selectedSeats = useLocation().state.selectedSeats;
    // const Prices = useLocation().state.prices;
    // const Flight_ID = useLocation().state.Flight_ID;

    const selectedSeats = location.state.selectedSeats;
    const prices = location.state.prices;
    const flight_ID = location.state.flight_ID;

    const  seat_types = {
      'Economy':1,
      'Business':2,
      'Platinum':3
  }


    const seat_num =  parseFloat(selectedSeats[0].split('-')[1]);
    const seat_type = selectedSeats[0].split('-')[0];
    const Class_ID = seat_types[seat_type];
    const seat_price = prices[seat_type];

    


    const isFormValid = () => {
      return Object.values(formData).every((field) => field.trim() !== '');
    };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const InsertPassanger = ()=>{
        axios.post("http://localhost:5174/reservation/insertPassanger",formData)
        .then((response)=>{
            console.log(response.data);
            console.log("details",Class_ID,flight_ID,seat_num,seat_price);

            // const seat_num =  parseFloat(selectedSeats[0].split('-')[1]);
            // const seat_type = selectedSeats[0].split('-')[0];
            // const Class_ID = seat_types[seat_type];
            // const seat_price = Prices[seat_type];
            
            alert('Passanger inserted successfully');
            axios.post(`http://localhost:5174/reservation/make_a_ticket`,{
               Class_ID : Class_ID, 
               Flight_ID : flight_ID,
               seat_price : seat_price,
               seat_num :seat_num

            }).then((response)=>{
                console.log(response.data);
                alert('Ticket Created Successfully');
            }).catch((error)=>{
                console.log(error);
            })
        })
        .catch((error)=>{
            console.log(error);
        })
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid()) {
          alert('Please fill all the fields!');
          return;
        }
        InsertPassanger();
        if(selectedSeats.length === 1){
            console.log('Selected Seats:', selectedSeats);
            console.log("navigate to payment page");
            
        }
        else
        {
            selectedSeats.shift();
            setFormData({
              firstName: '',
              lastName: '',
              country: '',
              dob: '',
              address: '',
              city: '',
              email: '',
              gender: '',
              phone: ''
            });
            console.log("delete a seat");
            console.log('Now seats:', selectedSeats);
            console.log("navigate to next passanger"); 
            navigate(`/passanger-details/${selectedSeats[0]}`, { state: { selectedSeats,flight_ID,prices } });

        }

        console.log('Passenger Details:', formData);
        alert('Form submitted successfully!');
      };

      const SelectButton = ()=>{
        if (selectedSeats.length === 1){
            return (
                <button
                type="submit"
                className="w-full py-3 bg-violet-600 text-neutral-50 rounded-lg shadow hover:bg-violet-700 transition duration-300 font-semibold"
                onClick = {handleSubmit}
                 >
                Submit
              </button>

            )
        }
        else{
            return (
            <button
              type="submit"
              className="w-full py-3 bg-violet-600 text-neutral-50 rounded-lg shadow hover:bg-violet-700 transition duration-300 font-semibold"
              onClick = {handleSubmit}
            >
              Next Passanger
            </button>
            )
        }
      }


      useEffect(() => {
         if(selectedSeats && prices && flight_ID){
         console.log( "selected seats from state",selectedSeats);
         console.log( "Prices form state",prices);
         console.log( "Flight_ID from state",flight_ID);
         }
         else{
             console.log("No data");
         }
      },);

      // useEffect(() => {
      //   if (!location.state) {
      //     alert('Invalid navigation. Redirecting...');
      //   }
      //   else 
      //   {
      //     console.log(location.state);
      //   }
      // }, [location, navigate]);
      
    
      return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
          <div className="flex space-x-10 " style={{marginBottom:'50px',marginTop:'50px'}}>
          <div className="block bg-white/10 backdrop-blur-md rounded-full py-7 px-12">
                  <h2 className="text-white text-6xl font-bold">1</h2>
                </div>
                
                <div className="block bg-white/10 backdrop-blur-md rounded-full py-7 px-12">
                  <h2 className="text-white text-6xl font-bold">2</h2>
                </div>
                <div className="block bg-gradient-to-r from-blue-500 to-blue-700 rounded-full py-7 px-12">
                  <h2 className="text-white text-6xl font-bold">3</h2>
                </div>
                <div className="block bg-white/10 backdrop-blur-md rounded-full py-7 px-12">
                  <h2 className="text-white text-6xl font-bold">4</h2>
                </div>
          </div>
        <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-lg shadow-md max-w-3xl mx-auto space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100 text-center">
            Passenger Details for {seat}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name and Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>
            </div>
    
            {/* Country and DOB */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>
            </div>
    
            {/* Address and City */}
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />
            </div>
    
            {/* Email and Phone Number */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border dark:bg-neutral-800 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-violet-600"
                />
              </div>
            </div>
    
            {/* Gender */}
            <div>
              <label
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Gender
              </label>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === 'Male'}
                    onChange={handleChange}
                    required
                    className="form-radio focus:ring-violet-600"
                  />
                  <span className="text-neutral-700 dark:text-neutral-300">Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === 'Female'}
                    onChange={handleChange}
                    required
                    className="form-radio focus:ring-violet-600"
                  />
                  <span className="text-neutral-700 dark:text-neutral-300">Female</span>
                </label>
              </div>
            </div>
    
            {/* Submit Button */}
            {/* <button
              type="submit"
              className="w-full py-3 bg-violet-600 text-neutral-50 rounded-lg shadow hover:bg-violet-700 transition duration-300 font-semibold"
              onclick = {handleSubmit}
            >
              Submit
            </button> */}

            {SelectButton()}
          </form>
        </div>
        </div>
      );
    };

export default PassangerDetails;
