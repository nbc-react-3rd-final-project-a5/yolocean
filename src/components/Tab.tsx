"use client";
import React from "react";

interface ITabProps {
  activeTab: number;
  onClickTabFn: Function;
  tabs: string[];
}

const Tab = ({ activeTab, onClickTabFn, tabs }: ITabProps) => {
  return (
    <ul className="flex w-full gap-1">
      {tabs.map((tab, index) => (
        <li
          onClick={() => onClickTabFn(index)}
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
