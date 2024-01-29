"use client";
import Accordion from "@/components/Accordion";
import Tab from "@/components/Tab";
import React, { useState } from "react";
import customerData from "@/data/customerData.json";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/navigation";

const CustomerPage = () => {
  const [activeTab, setActiveTab] = useState<string>("사용자 정보 및 약관");
  const router = useRouter();
  {
    return (
      <div>
        <h1 className="text-[25px] font-[600] my-[80px] text-center">고객센터</h1>
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
              <Accordion key={q} title={q} body={a} />
            ))}
        </div>

        <CustomButton onClick={() => router.push("/form?formtype=qna")} size="lg" isFull={true} className="h-[50px]">
          1:1 문의하기
        </CustomButton>
      </div>
    );
  }
};
export default CustomerPage;
