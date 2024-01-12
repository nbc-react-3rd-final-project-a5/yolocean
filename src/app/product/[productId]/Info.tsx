"use client";
import Tab from "@/components/Tab";
import Section from "@/components/layout/Section";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  info_img: string;
  info: string[];
}

const ProductTab = ["상품설명", "상세정보", "후기", "제품문의"];

const Info = ({ info_img, info }: Props) => {
  const [activeTab, setActiveTab] = useState("상품 설명");
  const router = useRouter();

  return (
    <div className="mt-[16px]">
      <Tab
        tabs={ProductTab}
        activeTab={activeTab}
        handleTabClick={(e: React.MouseEvent<HTMLLIElement, MouseEvent>, tab: string) => {
          setActiveTab(tab);
          router.push(`#${e}`);
        }}
      />

      <article id="상품설명">
        <h1 className="text-[24px] my-[20px]">상품설명</h1>
        {info.map((item) => (
          <div key={item.split("&")[0]}>
            {item.split("&")[0]}:{item.split("&")[1]}
          </div>
        ))}
      </article>

      <article id="상세정보">
        <h1 className="text-[24px] my-[20px]">상세정보</h1>
        <Image
          src={info_img}
          alt="product_info"
          sizes="1200px"
          width={0}
          height={0}
          style={{ width: "100%", height: "auto" }}
        />
      </article>
    </div>
  );
};

export default Info;
