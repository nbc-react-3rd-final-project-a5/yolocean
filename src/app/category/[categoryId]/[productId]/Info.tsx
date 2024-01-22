"use client";
import Tab from "@/components/Tab";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Description from "./(article)/Description";
import Infomation from "./(article)/Infomation";
import Qna from "./(article)/Qna";
import Review from "./(article)/Review";
import Link from "next/link";

interface Props {
  info_img: string;
  info: string[];
  productId: string;
}

const ProductTab = ["상품설명", "상세정보", "후기", "제품문의"];

const Info = ({ info_img, info, productId }: Props) => {
  const [activeTab, setActiveTab] = useState("상품설명");
  const router = useRouter();

  const observerRef = useRef<any>([]);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    const calculatedRootMargin = `0px 0px -${window.innerHeight * 0.95 - 50}px 0px`;
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActiveTab(entries[0].target.id);
        }
      },
      { rootMargin: calculatedRootMargin }
    );
  }, []);

  useEffect(() => {
    if (!observer.current) return;
    observerRef.current.forEach((el: any) => {
      observer?.current?.observe(el);
    });

    return () => {
      observer?.current?.disconnect();
    };
  }, [observerRef, observer]);

  return (
    <div className="mt-[16px]">
      <div className="sticky top-0 z-10">
        <Tab
          tabs={ProductTab}
          activeTab={activeTab}
          handleTabClick={(tab: string) => {
            setActiveTab(tab);
            router.push(`#${tab}`);
          }}
        />
      </div>
      <article ref={(el) => (observerRef.current[0] = el)} id="상품설명" className="mt-[40px] w-[795px] mx-auto  ">
        <h1 className="text-[18px] font-[700] mb-[25px] ">상품설명</h1>
        <Description info_img={info_img} />
      </article>

      <article
        ref={(el) => (observerRef.current[1] = el)}
        className="w-[795px] mt-[40px] mx-auto  py-[60px] "
        id="상세정보"
      >
        <h1 className="text-[18px] font-[700] mb-[25px] ">상세정보</h1>
        <Infomation info={info} />
      </article>

      <article ref={(el) => (observerRef.current[2] = el)} className="w-[795px] mt-[40px] mx-auto  py-[60px]" id="후기">
        <h1 className="text-[18px] font-[700] mb-[25px] ">후기</h1>
        <Review productId={productId} />
      </article>

      <article
        ref={(el) => (observerRef.current[3] = el)}
        className="w-[795px] mt-[40px] mx-auto  py-[60px]"
        id="제품문의"
      >
        <div className="flex justify-between items-center  mb-[25px]">
          <h1 className="text-[18px] font-[700] ">제품문의</h1>
          <Link href={`/qna/product/${productId}`}>
            <button className="bg-point text-white text-[14px] rounded-lg  px-[18px] py-[10px]">{`문의 작성`}</button>
          </Link>
        </div>
        <Qna productId={productId} />
      </article>
    </div>
  );
};

export default Info;
