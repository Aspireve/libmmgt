import React from "react";
import TiaIcon from "../../images/Tia.png";
import Dropper from "../../images/Dropper.png";

const header = () => {
  return (
    <div className="flex items-center justify-between mt-6 mx-5 font-josefin">
      <div className="flex-1">
        <h1 className="ml-[22px] text-black text-4xl font-bold">
          Library Management
        </h1>
        <p className="ml-[22px] text-gray-500 mt-[5px] font-medium text-lg">
          Tanvir Chavan
        </p>
      </div>

      <div className="border border-blue-500 rounded-lg bg-white overflow-hidden w-[145px] h-[57px] flex items-center justify-between px-2 mb-[100px] mr-[50px]">
        <div className="flex items-center -ml-[15px]">
          <img src={TiaIcon.src} alt="logo" className="w-[45px] h-[45px] ml-4" />
          <div className="w-[1px] h-[24px] bg-blue mx-[8px]" />
          <span className="text-[blue] font-bold text-[16px]">TIA</span>
          <img
            src={Dropper.src}
            alt="dropdownIcon"
            className="ml-[5px] h-[10px]"
          />
        </div>
      </div>
    </div>
  );
};

export default header;
