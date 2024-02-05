"use client";
import { getAllCategory } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import ReviewItem from "./ReviewItem";
import React, { useState } from "react";
import { AdminReview, CategoryTable } from "@/types/db";

interface Props {
  searchParams: { [key: string]: any } | undefined;
  reviewList: AdminReview[] | undefined;
}

const ReviewList = ({ searchParams, reviewList }: Props) => {
  return (
    <>
      <div id="tab" className="mt-[10px] mx-auto space-y-[20px] min-w-[800px]">
        {reviewList !== undefined && reviewList.length > 0 ? (
          <ul>
            {reviewList.map((review: AdminReview) => (
              <li className="mb-[5px]" key={review.id}>
                <ReviewItem review={review} />
              </li>
            ))}
          </ul>
        ) : (
          <div>no review</div>
        )}
      </div>
    </>
  );
};

export default ReviewList;
