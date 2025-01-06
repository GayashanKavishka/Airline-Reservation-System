import React from "react";
import { FaMapPin } from "react-icons/fa6";
import { Link } from "react-router-dom";

// import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="w-full lg:px-28 md:px-16 sm:px-7 px-4 py-8 bg-[#000]">
      <div className="grid grid-cols-5 gap-5">
        <div className="space-y-5 col-span-2">
          <h1 className="text-lg font-medium text-white">About Us</h1>
          {/* <Link to="/" className='text-xl text-neutral-800 dark:text-neutral-200 font-bold'>
            <img src={Logo} alt="logo" className="w-44 h-auto object-contain" />
          </Link> */}
          <p className="text-neutral-600 dark:text-neutral-500 text-base font-normal pr-10">
            B Airways, a subsidiary of Virgin Airlines, is committed to
            delivering exceptional service with a focus on comfort and
            efficiency. Our fleet is meticulously maintained, ensuring a safe
            and smooth journey for every passenger. As part of the Virgin
            family, we uphold the highest standards in customer service,
            offering flexible booking options and personalized support to meet
            all your travel needs.
          </p>
        </div>

        <div className="space-y-7">
          <h1 className="text-lg font-medium text-white">Paperwork</h1>
          <ul className="space-y-2 text-neutral-600 dark:text-neutral-500 text-base font-normal">
            {/* <li>
              <Link to="#" className='hover:text-violet-600 ease-in-out duration-300'>About Us</Link>
            </li>
            <li>
              <Link to="#" className='hover:text-violet-600 ease-in-out duration-300'>Contact Us</Link>
            </li>
            <li>
              <Link to="#" className='hover:text-violet-600 ease-in-out duration-300'>Privacy Policy</Link>
            </li>
            <li>
              <Link to="#" className='hover:text-violet-600 ease-in-out duration-300'>Terms and Conditions</Link>
            </li> */}
          </ul>
        </div>

        <div className="space-y-7">
          <h1 className="text-lg font-medium text-white">Services</h1>
          <ul className="space-y-2 text-neutral-600 dark:text-neutral-500 text-base font-normal">
            {/* <li>
              <Link to="#" className='hover:text-violet-600 ease-in-out duration-300'>Safety Guarantee</Link>
            </li> */}
            {/* <li>
              <Link to="#" className='hover:text-violet-600 ease-in-out duration-300'>FAQ & Support</Link>
            </li> */}
            {/* <li>
              <Link to="#" className='hover:text-violet-600 ease-in-out duration-300'>Luxury Buses</Link>
            </li> */}
            {/* <li>
              <Link to="#" className='hover:text-violet-600 ease-in-out duration-300'>Enough Facilities</Link>
            </li> */}
          </ul>
        </div>

        <div className="space-y-7">
          <h1 className="text-lg font-medium text-white">Get In Touch</h1>
          <div className="space-y-4">
            <div className="flex gap-x-2">
              <FaMapPin className="text-2xl text-neutral-600 dark:text-neutral-500" />
              <div className="flex flex-col">
                <p className="text-xs text-neutral-600 dark:text-neutral-500">
                  For Support & Reservations
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">
                  123, Main Street, Colombo
                </p>
              </div>
            </div>

            {/* Change the icon of location to phone */}
            <div className="flex gap-x-2">
              <FaMapPin className="text-2xl text-neutral-600 dark:text-neutral-500" />
              <div className="flex flex-col">
                <p className="text-xs text-neutral-600 dark:text-neutral-500">
                  Contact Us!
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">
                  0112345678
                </p>
              </div>
            </div>

            {/* <div className="flex gap-x-2">
              <FaMapPin className='text-2xl text-neutral-600 dark:text-neutral-500' />
              <div className="flex flex-col">
                <p className="text-xs text-neutral-600 dark:text-neutral-500">
                  For Support & Reservations
                </p>
                <p className="text-sm text-neutral-700 dark:text-neutral-400">
                  123, Main Street, Colombo, Sri-Lanka
                </p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
