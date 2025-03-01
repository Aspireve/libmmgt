// app/Navbar/navbar.tsx
import React from "react";
import Home from "../../images/HomeIcon.png"; 
import AddTab from "../../images/AddTab.png"; 

const Navbar: React.FC = () => {
  return (
    <div className="w-full h-16 flex items-center px-4 sm:px-6 lg:px-8 bg-white shadow-sm border-b border-b-[#d9d9d9] font-josefin">
      {/* Flex Container */}
      <div className="flex items-center w-full">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <img
            src={Home.src}
            alt="Home Icon"
            className="w-5 h-5 cursor-pointer"
          />
          <div className="flex items-center bg-[#EDF1FF] rounded-md px-2 py-1 sm:px-3 sm:py-2">
            <span className="text-[#1E40AF] text-sm sm:text-base font-medium whitespace-nowrap">
              Academic operations
            </span>
          </div>
        </div>

        {/* Spacer to push AddTab to the right */}
        <div/>

        {/* Right Section */}
        <img
          src={AddTab.src}
          alt="AddTab Icon"
          className="w-[52px] h-10 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Navbar;