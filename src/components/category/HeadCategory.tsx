"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { RxHamburgerMenu } from "react-icons/rx";
import { CategoryTable } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "@/service/table";

interface Props {
  category: CategoryTable;
}

const CategoryName = ({ category: { id, category_name } }: Props) => {
  return (
    <Link href={`/category/${id}`} aria-label={`해당 ${category_name}으로 이동`}>
      <li className="p-2 hover:underline decoration-wavy decoration-point">{category_name}</li>
    </Link>
  );
};

const HeadCategory = () => {
  //카테고리 메뉴 열기
  const [open, setOpen] = useState(false);
  const { data: category, isLoading } = useQuery<CategoryTable[]>({ queryKey: ["category"], queryFn: getAllCategory });

  useEffect(() => {
    if (!open) return;
    const closeMenu = () => setOpen(false);

    const closeMenuTimer = setTimeout(() => {
      window.addEventListener("click", closeMenu);
    }, 200);

    return () => {
      clearTimeout(closeMenuTimer);
      window.removeEventListener("click", closeMenu);
    };
  }, [open]);

  return (
    <>
      <div>
        <button name="selectCate" onClick={() => setOpen(!open)} className="flex flex-row space-x-[10px]">
          <RxHamburgerMenu size="24" color="#3074F0" />
          <p className="text-[14px] text-point font-medium leading-loose mobile:hidden">카테고리</p>
        </button>
        <div
          id="HeadCateDropdown"
          className={
            open
              ? "space-y-2 z-10 absolute p-2 bg-white rounded-sm shadow w-44  mobile:w-full mobile:left-0 mobile:text-center mobile:mt-7"
              : "hidden"
          }
        >
          {!isLoading && category && (
            <ul className="pb-2 text-sm  text-gray-700">
              {category!.map((category) => (
                <CategoryName category={category} key={category.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default HeadCategory;
