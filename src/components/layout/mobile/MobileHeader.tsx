import HeadCategory from "@/components/category/HeadCategory";
import Link from "next/link";
import React from "react";
import HeaderSearch from "../HeaderSearch";
import AuthBtn from "@/components/auth/AuthBtn";
import HeaderCart from "../HeaderCart";

const MobileHeader = () => {
  return (
    <header className="py-2 border-b-[1px] border-b-line mb-[20px]">
      <div className="container m-auto flex flex-col max-w-[1200px] min-h-[128px] w-[90%] space-y-4">
        <div className="py-4">
          <Link href={"/"} className="text-point text-[28px] font-black">
            YOLOCEAN
          </Link>
        </div>

        <div className="flex flex-row justify-between pb-4">
          <div>
            <HeadCategory />
          </div>
          <div className="flex flex-row space-x-6">
            <HeaderSearch />
            <div>
              <AuthBtn />
            </div>
            <div>
              <HeaderCart />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
