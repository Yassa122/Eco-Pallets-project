/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { motion } from "framer-motion";

const FullWidthContainer = () => {
  return (
    <div className="w-full h-[481px] flex items-center justify-center bg-gradient-to-br from-black to-[#040404] mt-36 sm:mt-24 md:mt-36">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center text-white px-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-text-gradient tracking-widest leading-snug">
          Pioneering Your
          <br />
          Supply Chain's
          <br />
          Sustainability
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-base sm:text-lg text-[#B8B8B8] mt-8 sm:mt-16"
        >
          Empowering Supply Chains Worldwide, Our Plastic Pallets Transform
          Logistics <br className="hidden sm:block" />
          with Unmatched Durability, Sustainability, and Efficiency, One Pallet
          at a Time!
        </motion.p>
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Try Free
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 sm:px-6 py-2 bg-transparent border-2 border-blue-500 text-blue-500 rounded-lg font-semibold shadow-lg hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default FullWidthContainer;
