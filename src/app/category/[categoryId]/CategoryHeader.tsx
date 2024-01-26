"use client";
import { useModalStore } from "@/store/modalStore";
import React from "react";
import SelectOffice from "./SelectOffice";
import Link from "next/link";
import { useOfficeStore } from "@/store/officeStore";
import { FaLocationDot } from "react-icons/fa6";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";

const CategoryHeader = ({ categoryName }: { categoryName: string }) => {
  const { openModal } = useModalStore();
  const { office } = useOfficeStore();
  const linkList = [
    {
      name: "홈",
      url: "https://yolocean.vercel.app/"
    },
    {
      name: `${categoryName}`,
      url: "https://yolocean.vercel.app/category"
    }
  ];
  return (
    <div className="flex justify-between tablet:justify-end mobile:justify-end tablet:mb-10 mobile:mb-3">
      <div className="mobile:hidden tablet:hidden">
        <PageBreadCrumb linkList={linkList} />
      </div>
      <div className="flex gap-[12px] leading-none items-center h-[24px] ">
        {office.address !== "" ? (
          <button
            className="flex gap-[6px] text-[#3074F0] mobile:text-[14px] tablet:text-[14px]"
            onClick={() => {
              openModal(<SelectOffice />);
            }}
          >
            <FaLocationDot />
            <p className="mobile:truncate mobile:max-w-[300px] table:truncate table:max-w-[300px]">{office.address}</p>
          </button>
        ) : (
          <button
            className="bg-[#3074F0] text-white text-[14px] flex items-center gap-[6px] justify-center w-[89px] h-[24px] rounded-[999px]  mobile:bg-white mobile:text-[#3074F0] mobile:text-[16px]"
            onClick={() => {
              openModal(<SelectOffice />);
            }}
          >
            <FaLocationDot />
            <p className="mobile:text-[#3074F0]">매장 선택</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryHeader;
