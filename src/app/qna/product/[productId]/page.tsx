"use client";
import React, { useEffect } from "react";
import Section from "@/components/layout/Section";
import QnaForm from "../../[qnaId]/QnaForm";
import { useStore } from "zustand";
import { useAuthStore } from "@/store/authStore";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { ProductProperties } from "@/types/db";
import { getProduct } from "@/service/table";

const QnaPage = () => {
  const { auth } = useStore(useAuthStore);
  const { productId } = useParams<{ productId: string }>();
  const {
    data: product,
    isLoading,
    isError
  } = useQuery<ProductProperties>({
    queryFn: async () => getProduct({ productId }),
    queryKey: ["product", productId]
  });

  console.log(product);

  return (
    <>
      <Section title={"1:1 문의하기"} className="font-[600] text-[25px] leading-none" isCenter={true}>
        {product && (
          <div className="flex flex-row py-[20px] gap-[12px] border-[1px] border-t-[#262626] border-b-[#E5E5E5]">
            <figure className="w-[190px] h-[190px]">
              <Image priority src={product.thumbnail} width={190} height={190} alt={`${name} 썸네일 이미지`} />
            </figure>
            <div>
              <div className="flex flex-col gap-[10px] leading-none">
                <p className="text-[14px] font-normal tracking-[-0.42px] text-[#999] leading-none">
                  {product.category.category_name}
                </p>
                <p className=" font-medium tracking-[-0.48px] text-[#262626] truncate">{product.name}</p>
              </div>
            </div>
          </div>
        )}

        <QnaForm formType="qna" userId={auth} productId={productId} />
      </Section>
    </>
  );
};

export default QnaPage;
