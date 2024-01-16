import React from "react";
import ReviewItem from "./ReviewItem";
import { ExtendReview } from "@/types/db";

interface Props {
  reviewList: ExtendReview[] | undefined;
  currentUserId?: string;
}

const ReviewList = ({ reviewList, currentUserId }: Props) => {
  if (!reviewList) return <div>등록된 리뷰가 없습니다.</div>;

  return (
    <ul>
      {reviewList.map((review, i) => (
        <li key={`review-${i}`}>
          <ReviewItem review={review} currentUserId={currentUserId} />
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
