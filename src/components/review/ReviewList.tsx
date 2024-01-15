import React from "react";
import ReviewItem from "./ReviewItem";
import { ExtendReview } from "@/types/db";

interface Props {
  reviewList: ExtendReview[];
}

const ReviewList = ({ reviewList }: Props) => {
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
