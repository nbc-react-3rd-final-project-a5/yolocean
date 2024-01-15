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
              onClick={(e) => handleTabClick(e, tab)}
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
              className={`flex-1 text-center cursor-pointer  border-neutral-400 border-4 rounded-sm p-1  ${
                activeTab === tab ? "bg-neutral-400  text-black" : "bg-white"
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
