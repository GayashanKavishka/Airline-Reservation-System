import React from "react";
import { useEffect } from "react";
import Hero from "./Hero/Hero";


const Home = () => {
  useEffect(() => {
    localStorage.removeItem("selectedSeats");
    // localStorage.setItem("selectedSeats", JSON.stringify([]));
    // console.log("selectedSeats", JSON.parse(localStorage.getItem("selectedSeats")));
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
};

export default Home;
