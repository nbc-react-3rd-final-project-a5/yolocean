// TODO : Hydration failed because the initial UI does not match what was rendered on the server. 문제해결하기

"use client";

import React from "react";
import ReviewList from "@/components/review/ReviewList";
import useReview from "@/hooks/useReview";

const ReviewListPage = () => {
  const userId = "3255837d-277c-4e5d-9e52-6956be86f182";
  // 1. 유저가 쓴 전체 리뷰
  const { reviewData, isLoading, isError } = useReview({
    userId
  });

  // 2. 유저가 쓴 리뷰 단일 데이터
  // const { reviewData, isLoading, isError  } = useReview({
  //     userId: "3255837d-277c-4e5d-9e52-6956be86f182",
  //     reviewId: "b84c1f85-3a54-47f5-8382-b57a2bc8a10a"
  //   });

  if (isLoading) return <>리뷰 데이터 로딩중</>;

  return (
    <>
      <ReviewList reviewList={reviewData} currentUserId={userId} />
    </>
  );
};

export default ReviewListPage;
