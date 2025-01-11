import React from "react";
import { useEffect } from "react";
import Hero from "./Hero/Hero";


const Home = () => {
  useEffect(() => {
    localStorage.removeItem("selectedSeats");
    localStorage.setItem("finalBooking", JSON.stringify([]));
    console.log("Final Seats", JSON.parse(localStorage.getItem("finalBooking")));
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
