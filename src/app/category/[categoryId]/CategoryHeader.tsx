"use client";
import { useModalStore } from "@/store/modalStore";
import React from "react";
import SelectOffice from "./SelectOffice";
import Link from "next/link";
import { useOfficeStore } from "@/store/officeStore";
import { FaLocationDot } from "react-icons/fa6";

const CategoryHeader = ({ categoryName }: { categoryName: string }) => {
  const { openModal } = useModalStore();
  const { office } = useOfficeStore();
  return (
    <div className="flex justify-between container m-auto max-w-[1200px] w-[90%]">
      <p>
        <Link href="/">홈</Link> {">"} {categoryName}
      </p>
      <div className="flex gap-[12px] leading-none items-center h-[24px]">
        {!!office ? (
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
