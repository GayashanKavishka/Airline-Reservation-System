import React from "react";
import { useEffect } from "react";
import Hero from "./Hero/Hero";
import BootstrapCarousel from "../../components/Carousel/Carousel";
import WelcomeBanner from "../../components/Welcome/Welcome";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";


const Home = ({OnClickFunction}) => {
  useEffect(() => {
    localStorage.removeItem("selectedSeats");
    localStorage.setItem("finalBooking", JSON.stringify([]));
    console.log("Final Seats", JSON.parse(localStorage.getItem("finalBooking")));
  }, []);

  const handleClick = () => {
     const hero = document.getElementById("hero");
     console.log(hero);
     hero.scrollIntoView({ behavior: "smooth" });
  }
  

  return (
    <div className="relative">
      {/* Fixed Navbar at the top */}
      <Navbar />
      
      <WelcomeBanner onClickFunction={handleClick} onClickAbout={OnClickFunction} />
      <div id = "hero">
      <Hero  />
      </div>
      <BootstrapCarousel />
    </div>
  );
};

export default Home;
