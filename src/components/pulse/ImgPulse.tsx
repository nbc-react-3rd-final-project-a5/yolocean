import React from "react";
import { FaRegFileImage } from "react-icons/fa";

const ImgPulse = () => {
  return (
    <div className="flex items-center justify-center  absolute inset-0 bg-gray-300 rounded-lg animate-pulse">
      <FaRegFileImage size={40} />
    </div>
  );
};

export default ImgPulse;
