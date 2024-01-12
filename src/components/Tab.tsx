"use client";
import React from "react";

interface TabProps {
  activeTab: string;
  handleTabClick: Function;
  tabs: string[];
}

const Tab = ({ activeTab, handleTabClick, tabs }: TabProps) => {
  return (
    <ul className="flex w-full items-center justify-center gap-[20px]">
      {tabs.map((tab, index) => (
        <li
          onClick={() => handleTabClick(tab)}
          className={` px-[20px] py-[10px] text-center rounded-3xl cursor-pointer  border-neutral-400 border    ${
            activeTab === tab ? "bg-[#3074F0]  text-white" : "bg-white text-black"
          }`}
          // className={`flex-1 text-center cursor-pointer  border-neutral-400 border-4 rounded-sm p-1  ${
          //   activeTab === index ? "bg-neutral-400  text-black" : "bg-white"
          // }`}
          key={tab}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default Tab;
