"use client";

import Link from "next/link";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";

enum EnumStyle {
  textSize = "text-[1.5rem]",
  liStyle = "w-[50px] h-[50px] transition-colors  rounded-full overflow-hidden border-[1px] border-line bg-white text-tc-light hover:bg-point hover:border-point hover:text-white ",
  liInnerStyle = "w-full h-full flex flex-col justify-center items-center"
}

const PageControlBtnGroup = () => {
  const handleScrollTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside className="fixed bottom-[10rem] right-4">
      <ul className={`${EnumStyle.textSize} flex flex-col gap-4`}>
        <li className={EnumStyle.liStyle}>
          <button onClick={handleScrollTopClick} className={EnumStyle.liInnerStyle}>
            <IoIosArrowUp />
          </button>
        </li>
        <li className={EnumStyle.liStyle}>
          <Link href={"/customer"} className={EnumStyle.liInnerStyle} prefetch={true}>
            <RiCustomerService2Fill />
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default PageControlBtnGroup;
