import React from "react";
import ImgPulse from "./ImgPulse";

const CartPulse = () => {
  return (
    <div role="status" className="animate-pulse space-y-8 w-[100%] flex flex-col my-2 border-y">
      <div className="flex flex-row mt-5">
        <div className="mx-5 w-[190px] h-[190px] relative">
          <ImgPulse />
        </div>
        <div className="mx-3 ">
          <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full max-w-[360px]"></div>
        </div>
      </div>
      <div className=" flex flex-row justify-between mt-[20px]">
        <div className="h-3 bg-gray-200 rounded-full w-48"></div>
        <div className="h-4 bg-gray-200 rounded-full w-48 mb-4"></div>
      </div>
    </div>
  );
};

export default CartPulse;
