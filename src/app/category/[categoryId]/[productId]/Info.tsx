"use client";
import Tab from "@/components/Tab";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  info_img: string;
  info: string[];
}

const ProductTab = ["상세정보", "상품설명", "후기", "제품문의"];

const Info = ({ info_img, info }: Props) => {
  const [activeTab, setActiveTab] = useState("상품 설명");
  const router = useRouter();

  return (
    <div className="mt-[16px]">
      <Tab
        tabs={ProductTab}
        activeTab={activeTab}
        handleTabClick={(tab: string) => {
          setActiveTab(tab);
          router.push(`#${tab}`);
        }}
      />

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

      <article id="상품설명">
        <h1 className="text-[24px] my-[20px]">상품설명</h1>
        <table className="w-full text-sm text-left border text-gray-500 ">
          <tbody>
            {info.map((item) => (
              <tr key={item.split("&")[0]} className="bg-white border-b ">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                  {item.split("&")[0]}
                </th>
                <td className="px-6 py-4 text-center border-l">{item.split("&")[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </div>
  );
};

export default Info;
