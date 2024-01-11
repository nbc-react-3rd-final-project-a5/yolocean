"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import { RxHamburgerMenu } from "react-icons/rx";
import useCategory from "@/hooks/useCategory";
import { CategoryTable } from "@/types/db";

interface Props {
  category: CategoryTable;
}

const CategoryName = ({ category: { id, category_name } }: Props) => {
  return (
    <Link href={`/category/${id}`}>
      <li>{category_name}</li>
    </Link>
  );
};

const HeadCategory = () => {
  //카테고리 메뉴 열기
  const [open, setOpen] = useState(false);
  const { category, isLoading } = useCategory();
  //   console.log(category);

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
      <div className="flex flex-row space-x-4 cursor-pointer relative" onClick={() => setOpen(!open)}>
        <RxHamburgerMenu size="24" />
        <p>카테고리</p>
        {open && !isLoading && (
          <ul className="absolute p-1 mt-7 ml-7 text-right w-32 z-50 right-0 bg-white shadow-md cursor-pointer">
            {(category as CategoryTable[]).map((category) => (
              <CategoryName category={category} key={category.id} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default HeadCategory;
