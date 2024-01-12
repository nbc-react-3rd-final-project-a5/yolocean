"use client";
import { useModalStore } from "@/store/modalStore";
import React from "react";
import CategorySelect from "./CategorySelect";
import Link from "next/link";

const CategoryHeader = ({ categoryName }: { categoryName: string }) => {
  const { openModal } = useModalStore();
  return (
    <div className="flex justify-between">
      <p>
        <Link href="/">홈</Link> {">"} {categoryName}
      </p>
      <button
        onClick={() => {
          openModal(
            "위치선택",
            <div>
              <CategorySelect />{" "}
            </div>
          );
        }}
      >
        위치 선택
      </button>
    </div>
  );
};

export default CategoryHeader;
