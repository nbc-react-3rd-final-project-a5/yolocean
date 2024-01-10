"use client";
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { supabase } from "@/service/supabase";

const HeadCategory = () => {
  //카테고리 메뉴 열기
  const [open, setOpen] = useState(true);

  const OpenCategory = () => {
    return (
      <>
        <ul className="absolute p-1 mt-2 text-right w-32 z-50 right-0 bg-white border-2 rounded-xl border-gray-300 cursor-pointer">
          {}
        </ul>
      </>
    );
  };
  return (
    <>
      <div onClick={() => setOpen(!open)} className="flex flex-row space-x-4 cursor-pointer">
        <RxHamburgerMenu size="24" />
        <p>카테고리</p>
        {open && <OpenCategory />}
      </div>
    </>
  );
};

export default HeadCategory;
