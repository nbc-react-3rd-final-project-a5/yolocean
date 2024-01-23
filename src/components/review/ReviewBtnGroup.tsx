"use client";

import { useCustomMutation } from "@/hook";
import { deleteUserQna, deleteUserReview } from "@/service/table";
import { openConfirm } from "@/store/confirmStore";
import Link from "next/link";
import React from "react";

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
  const { mutate: reviewMutate } = useCustomMutation({
    mutationFn: async () => deleteUserReview({ userId, reviewId }),
    queryKey: productId ? [listType, productId] : [listType]
  });

  const { mutate: qnaMutate } = useCustomMutation({
    mutationFn: async () => deleteUserQna({ userId, qnaId: reviewId }),
    queryKey: productId ? [listType, productId] : [listType]
  });

  const editLink =
    listType === "review"
      ? `${window.location.origin}/review/form?reviewId=${reviewId}`
      : `${window.location.origin}/qna/${reviewId}`;
  const handleDeleteReviewClick = async () => {
    const isConfirm = await openConfirm(
      `${EnumListType[listType]} 삭제`,
      `${EnumListType[listType]} 삭제를 진행하겠습니까?`
    );
    if (isConfirm) {
      if (listType === "review") {
        reviewMutate();
      } else {
        qnaMutate();
      }
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
