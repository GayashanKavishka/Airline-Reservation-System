import React from 'react';
import Image from '../../assets/Images/Hero_Plane3.png';
import {Link} from 'react-scroll'

const WelcomeBanner = ({onClickFunction,onClickAbout}) => {


  return (
    <div className="relative h-[500px] w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center pt-20">
      {/* Background Image */}
      <img
        src={Image}
        alt="Welcome Banner"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />

      {/* Overlay Text */}
      <div className="z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to <span style={{color:"Blue"}}>B</span> Airways</h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Your Trusted Partner for a Smooth and Incredible Flying Experience
        </p>
        <button className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-lg text-white text-lg" onClick={onClickFunction}>
         Get Started
        </button>
        <button className="mt-6 px-6 py-3 bg-green-600 ml-10 hover:bg-green-700 rounded-lg shadow-lg text-white text-lg" onClick={onClickAbout}>
         About Us
        </button>
      </div>
    </div>
  );
};

export default WelcomeBanner;
