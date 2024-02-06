import React from "react";
import ImgPulse from "./ImgPulse";
import Image from "next/image";

const CardPulse = () => {
  return (
    <div className="mobile:max-w-[160px] tablet:max-w-[180px] max-w-[246px] max-h-[340px] w-full ">
      <div className="relative tablet:max-w-[180px] tablet:h-[180px] h-[246px] max-w-[246px] w-full mb-[20px] mobile:max-w-[160px] mobile:max-h-[160px]">
        <Image
          alt={`image_Pulse`}
          sizes="(max-width: 1200px) 246px, (max-width: 1024px) 160px, 300px"
          placeholder="blur"
          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg=="
          fill
          width={0}
          height={0}
          src={
            "https://hntpomvsqgbdpwrjnsun.supabase.co/storage/v1/object/public/product/258b67f0-fa95-4c22-a6f3-5302a2118a7d/detail"
          }
        />
      </div>
      <div className="flex flex-col gap-[10px] animate-pulse">
        <div className=" h-[12px] w-[50px] bg-gray-200 rounded-full "></div>
        <div className="text-[14px] font-[500] bg-gray-200 rounded-full h-[14px] max-w-[246px] w-full "></div>
        <div className="flex justify-between items-center">
          <div className="flex gap-[8px] items-center">
            <div className="text-[16px] h-[16px] w-[150px] bg-gray-200 rounded-full "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPulse;
