"use client";
import Tab from "@/components/Tab";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import CommonGuide from "./CommonGuide";
import { useReview } from "@/hooks";
import ReviewList from "@/components/review/ReviewList";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "zustand";
import { useAuthStore } from "@/store/authStore";
import Link from "next/link";

interface Props {
  info_img: string;
  info: string[];
  id: string;
}

const ProductTab = ["상품설명", "상세정보", "후기", "제품문의"];

const Info = ({ info_img, info, id }: Props) => {
  const [activeTab, setActiveTab] = useState("상품설명");
  const router = useRouter();
  const { reviewData } = useReview({ productId: id });
  const { auth } = useStore(useAuthStore);
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const response = await fetch(`/api/qna/product/${id}`, { method: "GET" });
      const result = await response.json();
      return result;
    },
    queryKey: ["qna", id]
  });

  const observerRef = useRef<any>([]);

  const scrollObsuerver = useMemo(
    () =>
      new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setActiveTab(entries[0].target.id);
          }
        },
        { rootMargin: `0px 0px -90% 0px` }
      ),

    []
  );

  useEffect(() => {
    if (!observerRef.current) return;
    observerRef.current.forEach((el: any) => {
      scrollObsuerver.observe(el);
    });

    return () => {
      scrollObsuerver.disconnect();
    };
  }, [observerRef, scrollObsuerver]);

  return (
    <div className="mt-[16px]">
      <div className="sticky top-0">
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
        <Image
          src={info_img}
          alt="product_info"
          sizes="(max-width: 1200px) 795px"
          width={0}
          height={0}
          className="w-[795px] h-auto "
        />
      </article>

      <article ref={(el) => (observerRef.current[1] = el)} className="w-[795px] mx-auto  mt-[40px " id="상세정보">
        <CommonGuide />
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

      <article ref={(el) => (observerRef.current[2] = el)} className="w-[795px] mx-auto  mt-[40px" id="후기">
        {reviewData && <ReviewList reviewList={reviewData} listType="review" />}
      </article>

      <article ref={(el) => (observerRef.current[3] = el)} className="w-[795px] mx-auto  mt-[40px" id="제품문의">
        <Link href={`/qna/product/${id}`}>작성테스트</Link>
        {data && !isLoading && <ReviewList currentUserId={auth} reviewList={data} listType="qna" />}
      </article>
    </div>
  );
};

export default Info;
