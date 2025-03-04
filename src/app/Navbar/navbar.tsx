import React from "react";
import Home from "../../images/HomeIcon.png"; 
import AddTab from "../../images/AddTab.png"; 

const Navbar: React.FC = () => {
  return (
    <div className="w-full shadow-[0_0_2px_0_#00000040] h-16 flex border-b border-b-[#d9d9d9] px-6 bg-white font-josefin">
      <img
        src={Home.src}
        alt="Home Icon"
        className="w-5 h-5 mt-[25px] mr-[14px] cursor-pointer "
      />
      <div className="flex items-center bg-[#EDF1FF] rounded px-3 h-10 mt-[10px] gap-2">
        <span className="text-[#1E40AF] text-base font-medium">
          Academic operations
        </span>
      </div>
      <img
        src={AddTab.src}
        alt="AddTab Icon"
        className="w-[52px] h-10 mt-[9px] cursor-pointer"
      />
    </div>
  );
};

export default Navbar;
