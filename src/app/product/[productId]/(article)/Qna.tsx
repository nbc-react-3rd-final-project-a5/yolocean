"use client";
import Pagenation from "@/components/Pagenation";
import ReviewPulse from "@/components/pulse/ReviewPulse";
import ReviewList from "@/components/review/ReviewList";
import { useCustomMutation } from "@/hook";
import { getAllProductQna } from "@/service/table";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import Empty from "./Empty";

interface Props {
  productId: string;
}
const Qna = ({ productId }: Props) => {
  const [page, setPage] = useState(1);

  const { auth } = useAuthStore();
  const {
    data: qna,
    isLoading,
    refetch
  } = useQuery({
    queryFn: async () => await getAllProductQna({ page, productId }),
    queryKey: ["qna", productId, page]
  });

  return (
    <div>
      <div className="flex justify-end items-center  mb-[25px]">
        <Link href={`/form?productId=${productId}`}>
          <button className="bg-point text-white text-[14px] rounded-lg  px-[18px] py-[10px]">{`문의 작성`}</button>
        </Link>
      </div>
      {isLoading && Array.from({ length: 6 }).map((e, i) => <ReviewPulse key={i} />)}
      {qna && !isLoading && (
        <>
          {qna.maxPage === 0 && <Empty articleName="문의" />}
          <ReviewList productId={productId} currentUserId={auth} reviewList={qna.qna} listType="qna" />
          <Pagenation articleName={"제품문의"} setPage={setPage} maxPage={qna.maxPage} currentPage={page} limit={5} />
        </>
      )}
    </div>
  );
};

export default Qna;
