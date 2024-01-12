"use client";
import React from "react";

interface TabProps {
  activeTab: number;
  handleTabClick: Function;
  tabs: string[];
}

const Tab = ({ activeTab, handleTabClick, tabs }: TabProps) => {
  return (
    <ul className="flex w-full gap-1">
      {tabs.map((tab, index) => (
        <li
          onClick={() => handleTabClick(index)}
          className={`flex-1 text-center cursor-pointer  border-neutral-400 border-4 rounded-sm p-1  ${
            activeTab === index ? "bg-neutral-400  text-black" : "bg-white"
          }`}
          key={tab}
        >
          {tab}
        </li>
      ))}
    </ul>
  );
};

export default Tab;
