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
        <article className="mt-[40px] max-w-[795px] w-full mx-auto mobile:max-w-[300px]">
          <Description info_img={info_img} />
        </article>
      )}

      {searchParams === "상세정보" && (
        <article className=" max-w-[795px] w-full mt-[40px] mx-auto mobile:max-w-[300px]">
          <Infomation info={info} />
        </article>
      )}

      {searchParams === "후기" && (
        <article className=" max-w-[795px] w-full mx-auto mobile:max-w-[300px]">
          <Review productId={productId} />
        </article>
      )}

      {searchParams === "제품문의" && (
        <article className=" max-w-[795px] w-full mt-[40px] mx-auto mobile:max-w-[300px]">
          <Qna productId={productId} />
        </article>
      )}
    </div>
  );
};

export default Info;
