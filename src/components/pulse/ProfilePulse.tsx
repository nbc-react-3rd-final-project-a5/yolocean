import React from "react";
import AvatarPulse from "./AvatarPulse";

const ProfilePulse = () => {
  return (
    <div className="flex gap-[40px] justify-center items-center pt-[114px] mobile:flex-wrap">
      <div className="relative rounded-full w-[200px] h-[200px]">
        <AvatarPulse />
      </div>
      <div className="flex flex-col min-w-[274px] h-[170px] my-[10px]   gap-[46px]">
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[12px]">
            <div className="h-[16px] w-[50px] bg-gray-200 rounded-full"></div>
            <div className="h-[16px] w-[80px] bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex gap-[12px]">
            <div className="h-[16px] w-[50px] bg-gray-200 rounded-full"></div>
            <div className="h-[16px] w-[80px] bg-gray-200 rounded-full"></div>
          </div>
          <div className="flex gap-[12px]">
            <div className="h-[16px] w-[50px] bg-gray-200 rounded-full"></div>
            <div className="h-[16px] w-[100px] bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <div className="flex gap-[5px] text-[14px]"></div>
      </div>
    </div>
  );
};

export default ProfilePulse;
