"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
interface TabProps {
  activeTab: string;
  handleTabClick?: Function;
  tabs: string[];
  isVariable?: boolean;
  className?: string;
}

const Tab = ({ activeTab, handleTabClick, tabs, isVariable = false, className }: TabProps) => {
  const pathName = usePathname();
  return (
    <div className={`${!isVariable && "sticky top-0 z-10"} ${className}`}>
      <ul
        className={`  flex w-full items-center justify-center ${isVariable && "gap-[20px]"} mobile:${
          isVariable && "flex-wrap"
        }
      mobile:${isVariable && "gap-[10px]"}`}
        id="tab"
      >
        {tabs.map((tab, index) => {
          if (isVariable) {
            return (
              <li
                onClick={() => (handleTabClick as Function)(tab)}
                className={` px-[20px] py-[10px] text-center rounded-3xl cursor-pointer  border-line border    ${
                  activeTab === tab ? "bg-point  text-white" : "bg-white text-tc-light"
                }`}
                key={tab}
              >
                {tab}
              </li>
            );
          } else {
            return (
              <Link
                scroll={false}
                href={{ href: `${pathName}`, query: { article: tab } }}
                key={tab}
                className={`w-[25%] text-[16px] py-[15px] px-[10px] mobile:px-[5px] font-[500] text-center border-line border-b cursor-pointer  ${
                  activeTab === tab ? "bg-point  text-white" : "bg-bg text-tc-base"
                }`}
                onClick={() => document?.getElementById("tab")?.scrollIntoView({ behavior: "smooth" })}
                aria-label={`해당 ${tab}으로 이동`}
              >
                {tab}
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default Tab;
