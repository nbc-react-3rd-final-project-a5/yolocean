"use client";

import { useReview } from "@/hooks";
import { openConfirm } from "@/store/confirmStore";
import Link from "next/link";
import React from "react";

interface Props {
  reviewId: string;
  userId: string;
  listType: "review" | "qna";
}

enum EnumListType {
  review = "리뷰",
  qna = "문의"
}

const ReviewBtnGroup = ({ userId, reviewId, listType }: Props) => {
  const { deleteReviewMutation } = useReview({ reviewId, userId });
  const editLink = `${window.location.origin}/review/form?reviewId=${reviewId}`;
  const handleDeleteReviewClick = async () => {
    const isConfirm = await openConfirm(
      `${EnumListType[listType]} 삭제`,
      `${EnumListType[listType]} 삭제를 진행하겠습니까?`
    );
    if (isConfirm) {
      const res = deleteReviewMutation.mutate();
      console.log(res);
    }
  };
  return (
    <div className="flex flex-row gap-[12px] mt-[10px] ">
      <Link
        href={editLink}
        className="py-[10px] px-[32px] text-[14px] font-semibold rounded-[5px] bg-tc-middle text-white"
      >
        수정
      </Link>
      <button
        className="py-[10px] px-[32px] text-[14px] font-semibold rounded-[5px] border-[1px] border-line text-tc-middle"
        onClick={handleDeleteReviewClick}
      >
        삭제
      </button>
    </div>
  );
};

export default ReviewBtnGroup;
