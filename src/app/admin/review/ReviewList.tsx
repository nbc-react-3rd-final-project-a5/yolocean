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
  const [order, setOrder] = useState("descending");
  const [cate, setCate] = useState("no_category");

  const { data: categoryList, isLoading: isCategoryLoading } = useQuery({
    queryKey: ["category"],
    queryFn: async () => getAllCategory()
  });

  return (
    <>
      <div id="tab" className="max-w-[800px] mx-auto space-y-[20px]">
        <div>
          <select name="date_sort" id="date_sort" onChange={(e) => setOrder(e.target.value)}>
            <option value="descending">최신 순</option>
            <option value="ascending">오래된 순</option>
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
        <ul>
          {reviewList !== undefined &&
            reviewList.map((review: AdminReview) => (
              <li className="mb-[5px]" key={review.id}>
                <ReviewItem review={review} cate={cate} />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default ReviewList;
