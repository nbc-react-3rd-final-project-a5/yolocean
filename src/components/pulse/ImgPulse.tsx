import React from "react";
import { FaRegImage } from "react-icons/fa6";

const ImgPulse = () => {
  return (
    <div className="flex items-center justify-center  absolute inset-0 bg-gray-200 rounded-lg animate-pulse">
      <FaRegImage className="text-tc-light" size={40} />
    </div>
  );
};

export default ImgPulse;
