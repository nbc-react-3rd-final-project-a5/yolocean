"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../app/swiper.css";
import { useQuery } from "@tanstack/react-query";
import { getAllCarousel } from "@/service/table";
import Link from "next/link";
import ImgPulse from "./pulse/ImgPulse";

const Carousel = () => {
  const { data, isLoading } = useQuery({
    queryFn: async () => await getAllCarousel(),
    queryKey: ["carousel"],
    staleTime: 1000 * 60 * 10
  });

  return (
    <div className="mb-[10vh] mobile:mb-[50px]">
      {isLoading && (
        <div>
          <Image
            priority
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg=="
            placeholder="blur"
            alt="img"
            width={0}
            height={0}
            sizes="(max-width: 1200px) 1000px 2400px, (max-width: 1024px) 1000px 2048px, 1000px 2400px"
            className="w-[1200px] h-auto"
            src={
              "https://hntpomvsqgbdpwrjnsun.supabase.co/storage/v1/object/public/promotion/carousel/31174a1a-d08d-467d-9998-5c8f0cbbb9d0"
            }
          />
        </div>
      )}
      {!isLoading && data && (
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          modules={[Autoplay, Pagination]}
          loop={true}
          centeredSlides={true}
          className="mobile:w-[100vw] mobile:translate-x-[-5%]"
        >
          {data.map((item: any) => (
            <SwiperSlide key={item.id}>
              <Link href={item.url}>
                <Image
                  priority
                  blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg=="
                  placeholder="blur"
                  alt="img"
                  width={0}
                  height={0}
                  sizes="(max-width: 1200px) 1000px 2400px, (max-width: 1024px) 1000px 2048px, 1000px 2400px"
                  className="w-[1200px] h-auto"
                  src={item.img}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Carousel;
