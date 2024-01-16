"use client";
import { useReview } from "@/hooks";
import Link from "next/link";
import React from "react";

interface Props {
  reviewId: string;
  userId: string;
}

const ReviewBtnGroup = ({ userId, reviewId }: Props) => {
  const {} = useReview({ reviewId, userId });
  const editLink = `${window.location.origin}/review/form?reviewId=${reviewId}`;
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
        onClick={() => console.log("삭제기능")}
      >
        삭제
      </button>
    </div>
  );
};

export default ReviewBtnGroup;
