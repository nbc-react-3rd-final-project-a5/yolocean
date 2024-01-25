import React from "react";

const Banner = ({ url }: { url: string }) => {
  return (
    <div className="bg-slate-300 w-[1200px] h-[280px] mb-[200px]">
      <img src={url} className="w-full h-full overflow-hidden" alt="banner" />
    </div>
  );
};

export default Banner;
