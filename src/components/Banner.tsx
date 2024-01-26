import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = ({ url, link }: { url: string; link: string }) => {
  console.log(url);
  return (
    <div className="bg-slate-300 h-[280px] mb-[200px] mobile:mb-[50px] animate-purse relative">
      <Link href={`${link}`}>
        <Image
          fill
          alt="banner"
          className="w-[1200px] h-auto "
          sizes="(max-width: 1200px) 1200px "
          width={0}
          height={0}
          src={url}
        />
      </Link>
    </div>
  );
};

export default Banner;
