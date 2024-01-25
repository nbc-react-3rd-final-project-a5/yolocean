import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = ({ url, link }: { url: string; link: string }) => {
  return (
    <Link href={`${link}`}>
      <div className="bg-slate-300 w-[1200px] h-[280px] mb-[200px] animate-purse">
        <img src={url} alt="banner" className="w-full h-full" />
      </div>
    </Link>
  );
};

export default Banner;
