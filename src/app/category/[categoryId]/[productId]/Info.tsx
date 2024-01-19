"use client";
import Tab from "@/components/Tab";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CommonGuide from "./CommonGuide";
import { useReview } from "@/hooks";
import ReviewList from "@/components/review/ReviewList";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useStore } from "zustand";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import Pagenation from "@/components/Pagenation";
import Description from "./(article)/Description";
import Infomation from "./(article)/Infomation";
import Qna from "./(article)/Qna";
import Review from "./(article)/Review";

interface Props {
  info_img: string;
  info: string[];
  productId: string;
}

const ProductTab = ["상품설명", "상세정보", "후기", "제품문의"];

const Info = ({ info_img, info, productId }: Props) => {
  const [activeTab, setActiveTab] = useState("상품설명");
  const router = useRouter();
  const { reviewData } = useReview({ productId });
  const { auth } = useStore(useAuthStore);
  const [page, setPage] = useState(1);
  const [reviewPage, setReviewPage] = useState(1);

  const observerRef = useRef<any>([]);

  console.log(productId);

  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActiveTab(entries[0].target.id);
        }
      },
      { rootMargin: `0px 0px -80% 0px` }
    );
  }, []);

  useEffect(() => {}, []);

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
        <Description info_img={info_img} />
      </article>

      <article ref={(el) => (observerRef.current[1] = el)} className="w-[795px] mx-auto  mt-[40px " id="상세정보">
        <Infomation info={info} />
      </article>

      <article ref={(el) => (observerRef.current[2] = el)} className="w-[795px] mx-auto  mt-[40px" id="후기">
        {/* {reviewData && <ReviewList reviewList={reviewData} listType="review" />}
        {reviewData?.length === 0 && <div>후기가 없어요!!</div>} */}
        {/* {reviewData && <Pagenation setPage={setReviewPage} maxPage={data.maxPage} currentPage={reviewPage} limit={5} />} */}
        <Review productId={productId} />
      </article>

      {/* <article ref={(el) => (observerRef.current[3] = el)} className="w-[795px] mx-auto  mt-[40px" id="제품문의">
        <Qna productId={productId} />
      </article> */}
    </div>
  );
};

export default Info;
