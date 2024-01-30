import Link from "next/link";
import React from "react";
import { IoIosArrowUp } from "react-icons/io";
import { RiCustomerService2Fill } from "react-icons/ri";

enum EnumStyle {
  textSize = "text-[1.5rem]",
  liStyle = "w-[50px] h-[50px] transition-colors  rounded-full overflow-hidden border-[1px] border-line bg-white text-tc-light ",
  liInnerStyle = "w-full h-full flex flex-col justify-center items-center"
}

const PageControlBtnGroup = () => {
  return (
    <aside className="fixed bottom-[8rem] right-4 z-20">
      <ul className={`${EnumStyle.textSize} flex flex-col gap-4 `}>
        <li className={EnumStyle.liStyle}>
          <Link href={"#top"} className={EnumStyle.liInnerStyle} prefetch={true}>
            <IoIosArrowUp />
          </Link>
        </li>
        <li className={EnumStyle.liStyle}>
          <Link href={"/customer"} className={EnumStyle.liInnerStyle} scroll={false} prefetch={true}>
            <RiCustomerService2Fill />
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default PageControlBtnGroup;
