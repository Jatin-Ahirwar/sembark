import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; 

const Footer = () => {
  return (
    <div className="flex flex-col bg-white text-gray-900">
      <div className="pt-10 md:px-20 px-6 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="flex flex-col sm:flex-row gap-10 md:gap-20">
          <div>
            <h1 className="mb-4 text-xl font-semibold">About</h1>
            {["Blog", "Meet The Team", "Founders"].map((item, index) => (
              <p
                key={index}
                className="py-1 text-gray-600 hover:text-black cursor-pointer transition-all"
              >
                {item}
              </p>
            ))}
          </div>

          <div>
            <h1 className="mb-4 text-xl font-semibold">Support</h1>
            {["Contact Us", "Shopping", "Return", "FAQ"].map((item, index) => (
              <p
                key={index}
                className="py-1 text-gray-600 hover:text-black cursor-pointer transition-all"
              >
                {item}
              </p>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:items-end w-full md:w-auto">
            <p className="py-1 text-gray-600 font-medium">Social Media</p>
            <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black border border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <FaXTwitter className="text-white text-lg" />
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black border border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <FaFacebookF className="text-white text-lg" />
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black border border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <FaLinkedinIn className="text-white text-lg" />
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-black border border-gray-800 shadow-sm hover:shadow-md transition-all cursor-pointer">
                    <FaInstagram className="text-white text-lg" />
                </div>
            </div>

        </div>
      </div>

      <div className="pt-4 pb-4  px-6 md:px-20 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <p>© 2025 Jatin. All Rights Reserved</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <p className="hover:text-black cursor-pointer transition-all">Terms & Conditions</p>
          <p className="hover:text-black cursor-pointer transition-all">Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default Footer