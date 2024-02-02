"use client";

import { useCustomMutation } from "@/hook";
import { deleteUserQna, deleteUserReview } from "@/service/table";
import { openConfirm } from "@/store/confirmStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Spinner from "../Spinner";

interface Props {
  reviewId: string;
  userId: string;
  listType: "review" | "qna";
  productId?: string;
}

enum EnumListType {
  review = "리뷰",
  qna = "문의"
}

const ReviewBtnGroup = ({ userId, reviewId, listType, productId }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const editLink = listType === "review" ? `/form?reviewId=${reviewId}` : `/form?qnaId=${reviewId}`;
  const handleDeleteReviewClick = async () => {
    const isConfirm = await openConfirm(
      `${EnumListType[listType]} 삭제`,
      `${EnumListType[listType]} 삭제를 진행하겠습니까?`
    );
    if (isConfirm) {
      setLoading(true);
      if (listType === "review") {
        try {
          await deleteUserReview({ userId, reviewId });
          router.refresh();
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      } else {
        try {
          await deleteUserQna({ userId, qnaId: reviewId });
          router.refresh();
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <div className="flex flex-row gap-[12px] mt-[10px] ">
      {loading && <Spinner />}
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
