import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Images } from "../../../assets/Images";
import Ticket from "../../../components/Ticket";

import Navbar from "../../../components/Navbar/Navbar";

const Hero = () => {
  const navigate = useNavigate(); // Initialize navigate

  const imageVariants = {
    initial: {
      x: "100%",
    },
    animate: {
      x: "3%",
      transition: {
        duration: 1,
        ease: "easeInOut",
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
    <div className="w-full h-[calc(100vh-8ch)] lg:ps-28 md:ps-16 sm:ps-7 ps-4 mt-[8ch] flex items-center justify-center flex-col hero relative">
      <Navbar />
      <div className="flex-1 w-full flex items-stretch justify-between gap-12 pb-10">
        <motion.div
          className="w-[35%] h-auto rounded-md flex justify-center flex-col space-y-14"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "linear", delay: 0.2 }}
        >
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "linear", delay: 0.2 }}
          >
            <motion.h1
              className="text-7xl font-bold text-neutral-50 leading-[1.15] text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "linear", delay: 0.4 }}
            >
              Book Your <span> Tickets </span> now!
            </motion.h1>
            <motion.h1
              className="text-lg font-normal text-neutral-300 line-clamp-3 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, ease: "linear", delay: 0.6 }}
            >
              Fly with us for a smooth and incredible flying experience!
            </motion.h1>
          </motion.div>

          <motion.button
            className="bg-blue-400 px-5 py-2 rounded-md border-[2px] border-blue-400 border-solid ease-in-out blueShadowBig"
            onClick={handleBookNowClick}
          >
            <p className="font-semibold text-lg">Let's Get Started</p>
          </motion.button>
        </motion.div>

        <div className="w-[70%] h-fill rounded-md flex items-end justify-end absolute top-0 -right-48">
          {/* Add a plane image in the assets and uncomment this line */}
          <motion.img
            className="w-full aspect-[4/2] object-contain mt-10"
            src={Images.Hero1}
            alt="plane image"
            initial="initial"
            animate="animate"
            variants={imageVariants}
          />
          {/* <motion.img className="w-full aspect-[4/2] object-contain" src={Plane} alt='plane image' initial="initial" animate="animate" variants={imageVariants} /> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
