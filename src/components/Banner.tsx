import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = ({ url, link }: { url: string; link: string }) => {
  return (
    <div className="bg-slate-300 w-[1200px] h-[280px] mb-[200px] animate-purse relative">
      <Link href={`${link}`}>
        <Image fill alt="banner" sizes="(max-width: 1200px) 1200px " width={0} height={0} src={url} />
      </Link>
    </div>
  );
};

export default Banner;
