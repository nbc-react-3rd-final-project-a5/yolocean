import React from "react";
import ReviewItem from "./ReviewItem";
import { ExtendReview } from "@/types/db";

interface Props {
  reviewList: ExtendReview[] | undefined;
  currentUserId?: string;
  listType: "review" | "qna";
}

enum EnumListType {
  review = "리뷰",
  qna = "문의"
}

const ReviewList = ({ reviewList, currentUserId, listType }: Props) => {
  return (
    <>
      {!reviewList ? (
        <div>등록된 {EnumListType[listType]}가 없습니다.</div>
      ) : (
        <ul>
          {reviewList.map((review, i) => (
            <li key={`review-${i}`}>
              <ReviewItem review={review} currentUserId={currentUserId} listType={listType} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ReviewList;
