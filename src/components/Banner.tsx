import { Banner } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = ({ banner }: { banner: Banner | undefined }) => {
  return (
    <>
      <div className="bg-slate-300 w-full mb-[10vh] animate-purse mobile:w-[100vw] mobile:translate-x-[-5%]  relative">
        {banner ? (
          <Link href={`${banner.banner_link}`} aria-label="배너가 광고하는 페이지로 이동">
            <Image alt="banner" width={2400} height={560} src={banner.banner_url} />
          </Link>
        ) : (
          <p>이미지 불러오기 실패</p>
        )}
      </div>
    </>
  );
};

export default Banner;
