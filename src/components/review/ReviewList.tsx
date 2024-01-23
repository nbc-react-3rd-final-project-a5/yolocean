import React from "react";
import ReviewItem from "./ReviewItem";
import { ExtendReview } from "@/types/db";

interface Props {
  reviewList: ExtendReview[] | undefined;
  currentUserId?: string;
  isLoading?: boolean;
  listType: "review" | "qna";
  productId?: string;
}

enum EnumListType {
  review = "리뷰",
  qna = "문의"
}

const ReviewList = ({ reviewList, currentUserId, listType, isLoading, productId }: Props) => {
  if (isLoading) {
    return <div>{EnumListType[listType]}목록 로딩중...</div>;
  }

  return (
    <>
      <ul>
        {reviewList?.map((review, i) => (
          <li key={`review-${i}`}>
            <ReviewItem productId={productId} review={review} currentUserId={currentUserId} listType={listType} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ReviewList;
