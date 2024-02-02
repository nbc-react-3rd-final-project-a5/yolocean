"use client";

import CustomButton from "@/components/CustomButton";
import Article from "@/components/layout/Article";
import Section from "@/components/layout/Section";
import { useCustomMutation } from "@/hook";
import { getAllBanner, createBanner, deleteBanner } from "@/service/table/banner";
import { Banner } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import BannerForm from "./(Banner)/BannerForm";
import BannerInfoTable from "./(Banner)/BannerInfoTable";

const ManageBanner = () => {
  const { data: bannerList, isLoading } = useQuery({
    queryKey: ["ManageBanner"],
    queryFn: getAllBanner
  });

  const [selectBanner, setSelectBanner] = useState<Banner>();
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);

  return (
    <Section title={isCreateMode ? "Banner 생성" : "Banner 관리"} isCenter={false}>
      <div className="flex gap-4 mb-[1rem]">
        <CustomButton size="sm" onClick={() => setIsCreateMode(!isCreateMode)}>
          {!isCreateMode ? "Banner 생성하기" : "Banner 관리하기"}
        </CustomButton>
      </div>

      {isCreateMode ? (
        <Article title={"배너 리스트"}>
          <BannerForm isCreateMode={isCreateMode} />
        </Article>
      ) : (
        <>
          <Article title={"배너 리스트"}>
            <BannerInfoTable bannerList={bannerList} setSelectBanner={setSelectBanner} />
          </Article>
          <Article title={"선택한 배너 수정"}>
            <BannerForm selectBanner={selectBanner} isCreateMode={isCreateMode} />
          </Article>
        </>
      )}
    </Section>
  );
};

export default ManageBanner;
