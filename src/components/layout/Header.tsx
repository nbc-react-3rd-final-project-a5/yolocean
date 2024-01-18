import React from "react";
import Link from "next/link";

import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import AuthBtn from "../auth/AuthBtn";
import HeadCategory from "../category/HeadCategory";

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
            <div className="w-[392px] h-[32px] border border-point rounded-full p-1">
              <input type="text" className="mx-2 w-[330px] focus:outline-none" />
              <AiOutlineSearch className="inline " size="22" color="#3074F0" />
            </div>
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
