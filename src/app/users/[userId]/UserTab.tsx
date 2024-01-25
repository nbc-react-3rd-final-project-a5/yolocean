"use client";

import React from "react";
import Tab from "@/components/Tab";
import { useSearchParams } from "next/navigation";

interface Props {
  className?: string;
}

type article = "예약내역" | "렌트완료" | "작성한 리뷰" | "Q&A";

const UserTab = ({ className }: Props) => {
  const searchParams = useSearchParams();
  const article = searchParams.get("article");
  const tabList: article[] = ["예약내역", "렌트완료", "작성한 리뷰", "Q&A"];

  return (
    <div className={className}>
      <Tab activeTab={article || "예약내역"} tabs={tabList} isVariable={false} />
    </div>
  );
};

export default UserTab;
