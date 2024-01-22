"use client";

import { useParams } from "next/navigation";
import ReviewForm from "@/components/form/ReviewForm";
import Image from "next/image";
import React from "react";
import Section from "@/components/layout/Section";
import { useProduct } from "@/hooks";
import { ProductProperties } from "@/types/db";
import { useStore } from "zustand";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import QnaForm from "./QnaForm";

const QnaPage = () => {
  const { reviewId } = useParams<{ reviewId: string }>();
  // const { product, isLoading } = useProduct(reviewId);

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await fetch(`/api/qna/user/${reviewId}`);
      const result = await response.json();
      return result;
    },
    queryKey: ["qna", reviewId]
  });

  const { auth: userId } = useStore(useAuthStore);

  console.log(data);
  // TODO : 로그인 여부 및 제품이 있는지 확인하기

  if (isLoading) return <>로딩중</>;

  const {
    name,
    thumbnail,
    category: { category_name }
  } = data.product as ProductProperties;

  return (
    <>
      <Section title={"1:1 문의하기"} className="font-[600] text-[25px] leading-none" isCenter={true}>
        <div className="flex flex-row py-[20px] gap-[12px] border-[1px] border-t-[#262626] border-b-[#E5E5E5]">
          <figure className="w-[190px] h-[190px]">
            <Image priority src={thumbnail} width={190} height={190} alt={`${name} 썸네일 이미지`} />
          </figure>
          <div>
            <div className="flex flex-col gap-[10px] leading-none">
              <p className="text-[14px] font-normal tracking-[-0.42px] text-[#999] leading-none">{category_name}</p>
              <p className=" font-medium tracking-[-0.48px] text-[#262626] truncate">{name}</p>
            </div>
          </div>
        </div>
        {!isLoading && data && <QnaForm formType="qna" productId={data.product.id} review={data} userId={userId} />}
        {/* <ReviewForm userId={userId} productId={data.product.id} formType="qna" storeId={""} targetId={reviewId} /> */}
      </Section>
    </>
  );
};

export default QnaPage;
