"use client";
import { getAllReview } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import ReviewItem from "./ReviewItem";
import React from "react";
import { AdminReview } from "@/types/db";

const ReviewList = () => {
  const { data: reviewList, isLoading } = useQuery({
    queryKey: ["review"],
    queryFn: async () => await getAllReview()
  });
  //   console.log(reviewList);
  return (
    <>
      <div className="max-w-[800px] mx-auto space-y-[20px]">
        {!isLoading && reviewList.map((review: AdminReview) => <ReviewItem review={review} key={review.id} />)}
      </div>
    </>
  );
};

export default ReviewList;
