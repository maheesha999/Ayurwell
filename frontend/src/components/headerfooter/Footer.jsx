import React from 'react';
import logo from "/src/assets/logo.png";
//import './Footer.css'; // Add CSS in a separate file
import Whatsapp from '../images/wa.png';
import Insta from '../images/ins.png';
import FB from '../images/fb.png';

const Footer = () => {
  return (
    <div className="bg-[#064521] text-white w-full md:mx-15 px-12 py-1"> 
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-4 my-10 mt-20 text-sm">
        
        {/* Left Section */}
        <div>
          <img className="mb-5 w-40" src={logo} alt="AyurWell Logo" />
          <p className="w-full md:w-2/3 text-gray-300 leading-6">
            Experience holistic healing with our Smart Ayurvedic Healthcare Platform. 
            Book consultations with expert Ayurvedic doctors, explore authentic herbal 
            products, and track your health effortlessly. Ayurveda, personalized and 
            accessible for you.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li><a href="/cchats" className="hover:text-blue-400">Chat Us</a></li>
            <li><a href="/records" className="hover:text-blue-400">Return & Refunds</a></li>
            <li><a href="/deliverys/create" className="hover:text-blue-400">Shipping & Delivery</a></li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-300">
            <li>📞 0773214356</li>
            <li>📧 <a href="mailto:Dinukapriyankara@gmail.com" className="text-blue-400 hover:underline">Dinukapriyankara@gmail.com</a></li>
            <li className="flex gap-3 mt-2">
              <a href="#" role="button"><img src={Insta} alt="Instagram" className="w-6 h-6" /></a>
              <a href="#" role="button"><img src={FB} alt="Facebook" className="w-6 h-6" /></a>
              <a href="#" role="button"><img src={Whatsapp} alt="WhatsApp" className="w-6 h-6" /></a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div>
        <hr className="border-gray-500" />
        <p className="py-5 text-sm text-center text-gray-300">
          © 2024 AyurWell - All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
