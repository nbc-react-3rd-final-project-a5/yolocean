import React from "react";
import ReviewItem from "./ReviewItem";
import { ExtendReview } from "@/types/db";

interface Props {
  reviewList: ExtendReview[] | undefined;
  reviewType: "product" | "user";
}

const ReviewList = ({ reviewList, reviewType }: Props) => {
  if (!reviewList) return <div>등록된 리뷰가 없습니다.</div>;

  return (
    <ul>
      {reviewList.map((review, i) => (
        <li key={`review-${i}`}>
          <ReviewItem review={review} reviewType={reviewType} />
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
