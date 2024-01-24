import Tab from "@/components/Tab";
import React from "react";
import Description from "./(article)/Description";
import Infomation from "./(article)/Infomation";
import Qna from "./(article)/Qna";
import Review from "./(article)/Review";
import Link from "next/link";

interface Props {
  info_img: string;
  info: string[];
  productId: string;
  searchParams: string;
}

const ProductTab = ["상품설명", "상세정보", "후기", "제품문의"];

const Info = ({ info_img, info, productId, searchParams }: Props) => {
  return (
    <div className="mt-[16px]" id="tab">
      <div className="sticky top-0 z-10">
        <Tab tabs={ProductTab} activeTab={searchParams} />
      </div>
      {searchParams === "상품설명" && (
        <article className="mt-[40px] w-[795px] mx-auto">
          <Description info_img={info_img} />
        </article>
      )}

      {searchParams === "상세정보" && (
        <article className="w-[795px] mt-[40px] mx-auto">
          <Infomation info={info} />
        </article>
      )}

      {searchParams === "후기" && (
        <article className="w-[795px] mx-auto">
          <Review productId={productId} />
        </article>
      )}

      {searchParams === "제품문의" && (
        <article className="w-[795px] mt-[40px] mx-auto">
          <Qna productId={productId} />
        </article>
      )}
    </div>
  );
};

export default Info;
