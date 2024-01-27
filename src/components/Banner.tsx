import { Banner } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = ({ banner }: { banner: Banner }) => {
  return (
    <div className="bg-slate-300 h-[280px] mb-[200px] mobile:mb-[50px] animate-purse relative">
      <Link href={`${banner.banner_link}`}>
        <Image
          fill
          alt="banner"
          className="w-[1200px] h-auto "
          sizes="(max-width: 1200px) 1200px "
          width={0}
          height={0}
          src={banner.banner_url}
        />
      </Link>
    </div>
  );
};

export default Banner;
