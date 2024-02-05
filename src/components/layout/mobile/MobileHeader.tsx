import HeadCategory from "@/components/category/HeadCategory";
import Link from "next/link";
import React from "react";
import HeaderSearch from "../HeaderSearch";
import AuthBtn from "@/components/auth/AuthBtn";
import MobileSearch from "./MobileSearch";

const MobileHeader = () => {
  return (
    <header className=" py-2 border-b-[1px] border-b-line mb-[20px] hidden mobile:block">
      <div className="container m-auto flex items-center justify-between min-h-[70px] space-y-4">
        <div className="flex-1 ml-4 mt-3">
          <HeadCategory />
        </div>
        <div className="flex-0">
          <Link href={"/"} className="text-point text-[28px] font-black" aria-label="메인으로 이동">
            YOLOCEAN
          </Link>
        </div>
        <div className="flex justify-end gap-8 flex-1 mr-2 mt-3">
          <MobileSearch />
          <AuthBtn />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
