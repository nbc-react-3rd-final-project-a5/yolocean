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
    <ul className={`flex w-full items-center justify-center sticky top-0  ${isVariable && "gap-[20px]"}`}>
      {tabs.map((tab, index) => {
        if (isVariable) {
          return (
            <li
              onClick={() => handleTabClick(tab)}
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
            <li
              key={tab}
              className={`w-[291px] text-[16px] py-[15px] px-[10px]  font-[500] text-center border-line border-b cursor-pointer  ${
                activeTab === tab ? "bg-point  text-white" : "bg-bg text-tc-base"
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
