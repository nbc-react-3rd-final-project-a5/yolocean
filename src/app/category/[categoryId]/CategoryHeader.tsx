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
    <div className="flex justify-between container ">
      <PageBreadCrumb linkList={linkList} />
      <div className="flex gap-[12px] leading-none items-center h-[24px]">
        {office.address !== "" ? (
          <div className="flex gap-[6px] text-[#3074F0]">
            <FaLocationDot />
            <p>{office.address}</p>
          </div>
        ) : (
          <></>
        )}
        <button
          className="bg-[#3074F0] text-white text-[14px] flex items-center gap-[6px] justify-center w-[89px] h-[24px] rounded-[999px]"
          onClick={() => {
            openModal(<SelectOffice />);
          }}
        >
          <FaLocationDot />
          <p>위치 선택</p>
        </button>
      </div>
    </div>
  );
};

export default CategoryHeader;
