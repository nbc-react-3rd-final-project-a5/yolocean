import React from "react";
import AvatarPulse from "./AvatarPulse";
import ImgPulse from "./ImgPulse";

const ReviewPulse = () => {
  return (
    <div className="flex flex-col gap-[30px] border-b-[1px] border-line py-[40px]">
      <div className="flex flex-row  gap-[20px] items-center justify-between ">
        <div className="flex items-center gap-[24px]">
          <div className="relative rounded-full w-[36px] h-[36px]">
            <AvatarPulse />
          </div>
          <div className=" h-[16px] w-[50px] bg-gray-200 rounded-full "></div>
        </div>
        <div className=" h-[16px] w-[50px] bg-gray-200 rounded-full "></div>
      </div>

      <div>
        <div className=" h-[17px] w-[300px] mb-[10px] bg-gray-200 rounded-full "></div>
        <div className=" h-[17px] w-[200px] mb-[10px] bg-gray-200 rounded-full "></div>
      </div>

      <ul className="flex flex-row gap-[12px]">
        <li>
          <div className="w-[190px] h-[190px] mobile:w-[100px] mobile:h-[100px] relative">
            <ImgPulse />
          </div>
        </li>
        <li>
          <div className="w-[190px] h-[190px] mobile:w-[100px] mobile:h-[100px] relative">
            <ImgPulse />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ReviewPulse;
