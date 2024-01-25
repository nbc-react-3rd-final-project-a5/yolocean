import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ReactNode } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface Props {
  children: ReactNode[];
  autoplay?: boolean;
}

const SwiperBox = ({ children, autoplay }: Props) => {
  const modules = autoplay ? [Autoplay, Navigation, Pagination] : [Navigation, Pagination];

  return (
    <Swiper
      modules={modules}
      loop={true}
      slidesPerView={"auto"}
      autoplay={{ delay: 2000, disableOnInteraction: false }}
      spaceBetween={50}
      enabled
      pagination={{
        clickable: true
      }}
    >
      {children.map((test, index) => (
        <SwiperSlide key={index}>{test}</SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperBox;
