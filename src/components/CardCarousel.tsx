"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "../app/swiper.css";
// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { Scrollbar } from "swiper/modules";

import { ProductProperties } from "@/types/db";
import Card from "./Card";
const CardCarousel = ({ cardLists }: { cardLists: ProductProperties[] }) => {
  return (
    <div className="hidden mobile:block">
      <Swiper
        id="CardCarousel"
        slidesPerView={2}
        spaceBetween={0}
        pagination={{
          clickable: true
        }}
        modules={[Pagination]}
      >
        {cardLists.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <Card categoryId={item.category_id!} product={item} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CardCarousel;
