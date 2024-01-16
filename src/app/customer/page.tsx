"use client";
import Accordion from "@/components/Accordion";
import Tab from "@/components/Tab";
import React, { useState } from "react";
import customerData from "@/data/customerData.json";

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState<string>("사용자 정보 및 약관");
  {
    return (
      <div>
        <h1 className="text-[25px] font-semibold my-[80px] text-center">고객센터</h1>
        <Tab
          isVariable
          activeTab={activeTab}
          handleTabClick={(tab: string) => setActiveTab(tab)}
          tabs={customerData.tabs}
        />
        <div className="my-[40px]">
          {customerData.faq
            .find((item) => item.category === activeTab)
            ?.qna.map(({ q, a }, index) => (
              <Accordion key={q} title={q} body={a} index={index + 1} />
            ))}
        </div>
        <button className="w-full bg-[#3074F0] text-white text-[18px] py-[16px] text-center mb-[80px]">
          1:1문의하기
        </button>
      </div>
    );
  }
};
export default CustomerPage;
