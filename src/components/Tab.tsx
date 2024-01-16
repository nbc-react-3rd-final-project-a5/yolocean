"use client";
import React from "react";

interface TabProps {
  activeTab: string;
  handleTabClick: Function;
  tabs: string[];
  isVariable?: boolean;
}

const Tab = ({ activeTab, handleTabClick, tabs, isVariable = false }: TabProps) => {
  return (
    <ul className={`flex w-full items-center justify-center ${isVariable && "gap-[20px]"}`}>
      {tabs.map((tab, index) => {
        if (isVariable) {
          return (
            <li
              onClick={() => handleTabClick(tab)}
              className={` px-[20px] py-[10px] text-center rounded-3xl cursor-pointer  border-neutral-400 border    ${
                activeTab === tab ? "bg-[#3074F0]  text-white" : "bg-white text-black"
              }`}
              key={tab}
            >
              {tab}
            </li>
          );
        } else {
          return (
            <li
              key={tab}
              className={`w-[291px] text-[16px] py-[15px] px-[10px]  font-[500] text-center border-[#E5E5E5] border-b cursor-pointer  ${
                activeTab === tab ? "bg-[#3074F0]  text-white" : "text-[#595959]"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default Tab;
