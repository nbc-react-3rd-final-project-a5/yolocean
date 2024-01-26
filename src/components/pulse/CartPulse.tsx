import React from "react";
import { FaRegImage } from "react-icons/fa6";

const CartPulse = () => {
  return (
    <div
      role="status"
      className="animate-pulse space-y-8 w-[100%] flex flex-col my-2 border-y mobile:place-items-center"
    >
      <div className="flex flex-row my-5 mobile:place-items-center">
        <div className="flex justify-center items-center mx-5 w-[190px] h-[190px] bg-gray-200 mobile:mx-1 mobile:w-[100px] mobile:h-[100px]">
          <FaRegImage className="text-tc-light" />
        </div>
        <div className="px-3 py-5">
          <div className="h-4 bg-gray-200 rounded-full w-48 mb-4 mobile:w-25"></div>
          <div className="h-3 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
          <div className="h-3 bg-gray-200 rounded-full max-w-[360px]"></div>
        </div>
      </div>
    </div>
  );
};

export default CartPulse;
