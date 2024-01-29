import React from "react";
import ImgPulse from "./ImgPulse";

const UserRentPulse = () => {
  return (
    <div className="border-t border-b border-line py-5">
      <div className="flex animate-pulse">
        <figure className="relative aspect-square w-[20%] mr-[5%] h-[190px] flex items-center">
          <ImgPulse />
        </figure>

        <div className=" w-[75%] ">
          <div className="mb-[20px] bg-gray-200 rounded-full w-[8rem] h-[1rem]"></div>
          <div className="mb-[10px] bg-gray-200 rounded-full w-[6rem] h-[1rem]"></div>
          <div className="mb-[15px] bg-gray-200 rounded-full w-[15rem] h-[1rem]"></div>
          <div className="mb-[15px] bg-gray-200 rounded-full w-[15rem] h-[1rem]"></div>
          <div className="mb-[15px] bg-gray-200 rounded-full w-[5rem] h-[1rem]"></div>
          <div className="mb-[15px] bg-gray-200 rounded-full w-[3rem] h-[1rem]"></div>
        </div>
      </div>
    </div>
  );
};

export default UserRentPulse;
