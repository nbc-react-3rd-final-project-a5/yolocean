import ReviewList from "@/components/review/ReviewList";
import { getAllUserReview } from "@/service/table";

import React from "react";

interface Props {
  userId: string;
}

const UserReviewList = async ({ userId }: Props) => {
  const reviewList = await getAllUserReview({ userId, page: 1 });
  return (
    <>
      <ReviewList listType="review" reviewList={reviewList} currentUserId={userId} />
    </>
  );
};

export default UserReviewList;
