import React from "react";
import Link from "next/link";
import HeaderCart from "./HeaderCart";
import AuthBtn from "../auth/AuthBtn";
import HeadCategory from "../category/HeadCategory";
import HeaderSearch from "./HeaderSearch";
import MobileHeader from "./mobile/MobileHeader";

const Header = () => {
  return (
    <>
      <header className="py-2 border-b-[1px] border-b-line mb-[20px] mobile:hidden">
        <div className=" m-auto flex flex-col max-w-[1200px] min-h-[128px] w-[90%] space-y-4">
          <div className="py-4">
            <Link href={"/"} className="text-point text-[28px] font-black" aria-label="메인 페이지로 이동">
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
      <MobileHeader />
    </>
  );
};

export default Header;
