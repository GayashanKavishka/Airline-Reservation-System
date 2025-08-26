import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Images } from "../../../assets/Images";
import Ticket from "../../../components/Ticket";
import "./Hero.css";

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigate

  const imageVariants = {
    initial: {
      x: 50,
      opacity: 0,
      scale: 0.9,
    },
    animate: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
        delay: 0.6,
      },
    },
  };

  const handleSignInClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const handleBookNowClick = () => {
    navigate("/search-flight");
  };

  return (
    <div className="w-full min-h-screen flex flex-col hero relative bg-black pt-20">
      
      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center px-4 md:px-8 lg:px-16 py-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Content Section */}
          <motion.div
            className="flex flex-col justify-center space-y-8 text-center lg:text-left order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* Text Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
              >
                Book Your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Tickets
                </span>{" "}
                now!
              </motion.h1>
              
              <motion.p
                className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
              >
                Fly with us for a smooth and incredible flying experience! 
                Discover the world with comfort, safety, and exceptional service.
              </motion.p>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            >
              <motion.button
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 
                          text-white font-semibold text-lg px-8 py-4 rounded-full 
                          shadow-lg hover:shadow-xl transform hover:scale-105 
                          transition-all duration-300 ease-in-out
                          border-2 border-transparent hover:border-blue-300"
                onClick={handleBookNowClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Let's Get Started
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Image Section */}
          <motion.div
            className="flex items-center justify-center order-1 lg:order-2 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          >
            <div className="relative w-full max-w-2xl">
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"></div>
              
              {/* Plane Image */}
              <motion.img
                className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
                src={Images.Hero1}
                alt="Commercial Aircraft"
                initial="initial"
                animate="animate"
                variants={imageVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
              
              {/* Floating elements for visual enhancement */}
              <motion.div
                className="absolute top-10 left-10 w-4 h-4 bg-blue-400 rounded-full opacity-60"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-20 right-20 w-3 h-3 bg-cyan-400 rounded-full opacity-60"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/2 right-10 w-2 h-2 bg-white rounded-full opacity-40"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full h-20 text-white/5"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,60 C300,10 600,110 900,60 C1050,35 1150,85 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
