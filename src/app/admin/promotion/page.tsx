"use client";

import React, { useState } from "react";
import ManageBanner from "./ManageBanner";
import ManageCarousel from "./ManageCarousel";
import CustomButton from "@/components/CustomButton";

const PromotionPage = () => {
  const [isCarousel, setIsCarousel] = useState(true);
  return (
    <>
      <div className="flex gap-4 mb-[5rem]">
        <CustomButton disabled={isCarousel} size="sm" onClick={() => setIsCarousel(!isCarousel)}>
          Carousel 관리
        </CustomButton>
        <CustomButton disabled={!isCarousel} size="sm" onClick={() => setIsCarousel(!isCarousel)}>
          Banner 관리
        </CustomButton>
      </div>

      {isCarousel ? <ManageCarousel /> : <ManageBanner />}
    </>
  );
};

export default PromotionPage;
