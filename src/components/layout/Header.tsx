import React from "react";
import Link from "next/link";

import { AiOutlineShopping } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoIosLogOut } from "react-icons/io";

const Header = () => {
  return (
    <header className="py-2">
      <div className="container m-auto flex flex-col max-w-[1200px] min-h-[128px] w-[90%] space-y-4">
        <div className="py-4">
          <Link href={"/"} className="font-black text-3xl">
            YOLOCEAN
          </Link>
        </div>

        <div className="flex flex-row justify-between pb-4">
          <div className="flex flex-row space-x-4">
            <RxHamburgerMenu size="24" />
            <p>카테고리</p>
          </div>
          <div className="flex flex-row space-x-6">
            <div className="w-72 border border-black rounded-xl">
              <input type="text" className="mx-2 w-56 focus:outline-none" />
              <AiOutlineSearch className="inline mr-3 ml-2" size="20" />
            </div>
            <div>
              <AiOutlineUser size="22" />
            </div>
            <div>
              <Link href={"/장바구니"}>
                {" "}
                <AiOutlineShopping size="22" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
