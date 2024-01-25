import React from "react";
import { RxAvatar } from "react-icons/rx";

const AvatarPulse = () => {
  return (
    <div className="animate-pulse rounded-full absolute inset-0 bg-gray-200  ">
      <RxAvatar className="w-full h-full" />
    </div>
  );
};

export default AvatarPulse;
