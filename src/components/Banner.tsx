import { Banner } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Banner = ({ banner }: { banner: Banner | undefined }) => {
  return (
    <>
      {banner === undefined ? (
        <div className="bg-slate-300 h-[280px] mb-[200px] mobile:mb-[50px] mobile:h-[150px] animate-purse relative">
          <p>이미지 불러오기 실패</p>
        </div>
      ) : (
        <div className="bg-slate-300 h-[280px] mb-[200px] mobile:mb-[50px] mobile:h-[150px] animate-purse mobile:w-[100vw] mobile:translate-x-[-5%]  relative">
          <Link href={`${banner.banner_link}`} aria-label="배너가 광고하는 페이지로 이동">
            <Image
              fill
              alt="banner"
              className="w-[1200px] h-auto "
              sizes="(max-width: 1200px) 560px 2400px, (max-width: 1024px) 560px 2048px, 560px 2400px"
              width={0}
              height={0}
              src={banner.banner_url}
            />
          </Link>
        </div>
      )}
    </>
  );
};

export default Banner;
