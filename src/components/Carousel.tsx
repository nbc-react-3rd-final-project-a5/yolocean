"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaRegFileImage } from "react-icons/fa";
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
    staleTime: Infinity
  });

  console.log(data);

  return (
    <div className="mb-[150px]">
      {isLoading && (
        <div className="h-[500px] relative">
          <ImgPulse />
        </div>
      )}
      {!isLoading && data && (
        <Swiper
          className="h-[500px]"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false
          }}
          modules={[Autoplay, Pagination]}
          pagination={{
            clickable: true
          }}
          loop={true}
          centeredSlides={true}
        >
          {data.map((item: any) => (
            <SwiperSlide key={item.id} className="relative ">
              <Link href={item.url}>
                <Image
                  fill
                  priority
                  alt="img"
                  sizes="(max-width: 1200px) 1200px"
                  width={0}
                  height={0}
                  className="w-[1200px] h-auto "
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
