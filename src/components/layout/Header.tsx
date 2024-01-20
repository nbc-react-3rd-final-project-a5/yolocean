import React from "react";
import Link from "next/link";

import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import AuthBtn from "../auth/AuthBtn";
import HeadCategory from "../category/HeadCategory";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
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
              <Link href={"/cart"}>
                <AiOutlineShopping size="22" className="mt-[5px]" color="#3074F0" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
