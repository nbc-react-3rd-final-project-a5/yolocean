import React from "react";
import ReviewItem from "./ReviewItem";
import { ExtendReview } from "@/types/db";

interface Props {
  reviewList: ExtendReview[] | undefined;
}

const ReviewList = ({ reviewList }: Props) => {
  if (!reviewList) return <div>등록된 리뷰가 없습니다.</div>;

  return (
    <ul>
      {reviewList.map((review, i) => (
        <li key={`review-${i}`}>
          <ReviewItem review={review} />
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
