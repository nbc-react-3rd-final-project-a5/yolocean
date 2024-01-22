"use client";

import ReviewList from "@/components/review/ReviewList";
import { useReview } from "@/hooks";
import React from "react";

interface Props {
  userId: string;
}

const UserReviewList = ({ userId }: Props) => {
  const { reviewData, isLoading, isError } = useReview({ userId });
  return (
    <>
      <ReviewList listType="review" reviewList={reviewData} currentUserId={userId} isLoading={isLoading} />
    </>
  );
};

export default UserReviewList;
