"use client";
import { getAllCategory, getAllReview } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import ReviewItem from "./ReviewItem";
import React, { useState } from "react";
import { AdminReview, CategoryTable } from "@/types/db";

const ReviewList = () => {
  const { data: reviewList, isLoading: isReviewLoading } = useQuery({
    queryKey: ["review"],
    queryFn: async () => await getAllReview()
  });

  const { data: categoryList, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => getAllCategory()
  });

  // const [order, setOrder] = useState("");
  const [cate, setCate] = useState("no_category");
  //   console.log(reviewList);
  return (
    <>
      <div className="max-w-[800px] mx-auto space-y-[20px]">
        <div>
          <select name="date_sort" id="date_sort">
            <option value="ascending">오래된 순</option>
            <option value="descending">최신 순</option>
          </select>
          <select name="category" id="category" onChange={(e) => setCate(e.target.value)}>
            <option value="no_category">카테고리 선택</option>
            {!isCategoryLoading &&
              categoryList.map((category: CategoryTable) => (
                <option value={category.id} key={category.id}>
                  {category.category_name}
                </option>
              ))}
          </select>
        </div>
        {!isReviewLoading &&
          reviewList.map((review: AdminReview) => <ReviewItem review={review} cate={cate} key={review.id} />)}
      </div>
    </>
  );
};

export default ReviewList;
