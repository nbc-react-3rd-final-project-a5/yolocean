"use client";

import React from "react";
import Tab from "@/components/Tab";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

enum EnumTabList {
  reservation = "예약내역",
  rent = "렌트완료",
  review = "작성한 리뷰",
  qna = "Q&A"
}

const UserTab = ({ className }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const tabList = Object.values(EnumTabList);

  const handleTabClick = (tab: EnumTabList) => {
    const validateTab = Object.values(EnumTabList).includes(tab);
    const key = Object.keys(EnumTabList).filter((key) => EnumTabList[key as keyof typeof EnumTabList] === tab);
    validateTab ? router.push(`${pathname}?activeTab=${key}`) : router.push(`${pathname}?activeTab=reservation`);
  };

  return (
    <div className={className}>
      <Tab
        activeTab={EnumTabList[activeTab as keyof typeof EnumTabList] || EnumTabList["reservation"]}
        handleTabClick={handleTabClick}
        tabs={tabList}
        isVariable={false}
      />
    </div>
  );
};

export default UserTab;