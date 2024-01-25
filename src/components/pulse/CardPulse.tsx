import React from "react";
import ImgPulse from "./ImgPulse";

const CardPulse = () => {
  return (
    <div className="w-[246px]">
      <div className="relative h-[246px] w-[246px] mb-[20px]">
        <ImgPulse />
      </div>
      <div className="flex flex-col gap-[10px] animate-pulse">
        <div className=" h-[12px] w-[50px] bg-gray-200 rounded-full "></div>
        <div className="text-[14px] font-[500] bg-gray-200 rounded-full h-[14px] w-[246px] "></div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[8px] items-center">
            <div className="text-[16px] h-[16px] w-[150px] bg-gray-200 rounded-full "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPulse;
