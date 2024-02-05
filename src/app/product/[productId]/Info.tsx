import Tab from "@/components/Tab";
import React, { Suspense } from "react";
import Description from "./(article)/Description";
// import Infomation from "./(article)/Infomation";
import ReviewPulse from "@/components/pulse/ReviewPulse";
// import Review from "./(article)/Review";
// import Qna from "./(article)/Qna";
import dynamic from "next/dynamic";

const LoadingPulse = (
  <>
    {Array.from({ length: 6 }).map((e, i) => (
      <ReviewPulse key={i} />
    ))}
  </>
);

const Infomation = dynamic(() => import("./(article)/Infomation"), {});
const Review = dynamic(() => import("./(article)/Review"), {
  loading: () => LoadingPulse
});
const Qna = dynamic(() => import("./(article)/Qna"), {
  loading: () => LoadingPulse
});

interface Props {
  info_img: string;
  info: string[];
  productId: string;
  article: string;
  searchParams: { [key: string]: any } | undefined;
}

const ProductTab = ["상품설명", "상세정보", "후기", "제품문의"];

const Info = ({ info_img, info, productId, searchParams, article }: Props) => {
  return (
    <div className="mt-[16px]" id="tab">
      <div className="sticky top-0 z-10">
        <Tab tabs={ProductTab} activeTab={article} />
      </div>
      {article === "상품설명" && (
        <article className="mt-[40px] max-w-[795px] w-full mx-auto mobile:max-w-[300px]">
          <Description info_img={info_img} />
        </article>
      )}

      {article === "상세정보" && (
        <article className=" max-w-[795px] w-full mt-[40px] mx-auto mobile:max-w-[300px]">
          <Infomation info={info} />
        </article>
      )}

      {article === "후기" && (
        <article className=" max-w-[795px] w-full mx-auto mobile:max-w-[300px]">
          <Review page={searchParams?.["page"] || 1} productId={productId} />
        </article>
      )}

      {article === "제품문의" && (
        <article className=" max-w-[795px] w-full mt-[40px] mx-auto mobile:max-w-[300px]">
          <Qna page={searchParams?.["page"] || 1} productId={productId} />
        </article>
      )}
    </div>
  );
};

export default Info;
