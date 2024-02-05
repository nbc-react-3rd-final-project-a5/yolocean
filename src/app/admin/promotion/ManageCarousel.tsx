"use client";

import CustomButton from "@/components/CustomButton";
import Spinner from "@/components/Spinner";
import Article from "@/components/layout/Article";
import Section from "@/components/layout/Section";
import { getAllCarousel } from "@/service/table";
import { Carousel } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import CarouselForm from "./(Carousel)/CarouselForm";
import BannerInfoTable from "./(Banner)/BannerInfoTable";

const ManageCarousel = () => {
  const { data: carouselList, isLoading } = useQuery({
    queryKey: ["carousel"],
    queryFn: getAllCarousel
  });

  const [selectCarousel, setSelectCarousel] = useState<Carousel>();
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);

  if (!carouselList) {
    return <Spinner />;
  }

  const tableList = carouselList.map((n) => {
    return {
      id: n.id,
      name: "",
      link: n.url as string
    };
  });

  const onFindCarouselClick = (id: string) => {
    const selectedCarousel = carouselList.find((n) => n.id === id);
    setSelectCarousel(selectedCarousel);
  };

  return (
    <Section title={isCreateMode ? "Carousel 생성" : "Carousel 관리"} isCenter={false}>
      <div className="flex gap-4 mb-[1rem]">
        <CustomButton size="sm" onClick={() => setIsCreateMode(!isCreateMode)}>
          {!isCreateMode ? "Carousel 생성하기" : "Carousel 관리하기"}
        </CustomButton>
      </div>

      {isCreateMode ? (
        <Article title={"Carousel 생성하기"}>
          <CarouselForm isCreateMode={isCreateMode} />
        </Article>
      ) : (
        <>
          <Article title={"Carousel 리스트"}>
            <BannerInfoTable list={tableList} onClick={onFindCarouselClick} />
          </Article>

          <Article title={"선택한 Carousel 수정"}>
            <CarouselForm selectCarousel={selectCarousel} isCreateMode={isCreateMode} />
          </Article>
        </>
      )}
    </Section>
  );
};

export default ManageCarousel;
