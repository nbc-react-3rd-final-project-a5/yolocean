"use client";

import ReviewList from "@/components/review/ReviewList";
import { getAllUserReview } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import React from "react";

interface Props {
  userId: string;
}

const UserReviewList = ({ userId }: Props) => {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data: reviewList, isLoading } = useQuery({
    queryKey: ["review", userId],
    queryFn: async () => getAllUserReview({ userId, page: page })
  });

  if (isLoading) return <></>;

  return (
    <>
      {reviewList?.length > 0 ? (
        <ReviewList listType="review" reviewList={reviewList} currentUserId={userId} />
      ) : (
        <div className="w-full text-center text-[18px] font-semibold"> 작성된 리뷰가 없습니다 😅</div>
      )}
    </>
  );
};

export default UserReviewList;
