"use client";
import { useModalStore } from "@/store/modalStore";
import React from "react";
import SelectOffice from "./SelectOffice";
import Link from "next/link";

const CategoryHeader = ({ categoryName }: { categoryName: string }) => {
  const { openModal } = useModalStore();
  return (
    <div className="flex justify-between container m-auto max-w-[1200px] w-[90%]">
      <p>
        <Link href="/">홈</Link> {">"} {categoryName}
      </p>
      <button
        className="bg-[#3074F0] text-white"
        onClick={() => {
          openModal("위치선택", <SelectOffice />);
        }}
      >
        위치 선택
      </button>
    </div>
  );
};

export default CategoryHeader;
