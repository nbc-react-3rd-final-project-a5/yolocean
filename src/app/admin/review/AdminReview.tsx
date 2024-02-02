"use client";
import React from "react";
import ReviewList from "./ReviewList";
import SelectCategory from "./SelectCategory";
import { getAllReview } from "@/service/table";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

interface Props {
  searchParams: { [key: string]: any } | undefined;
}

const AdminReview = ({ searchParams }: Props) => {
  const page = searchParams?.["page"] || 1;
  const category = searchParams?.["article"] || "";

  const { data: reviewList, isLoading: isReviewLoading } = useQuery({
    queryFn: async () => await getAllReview({ page, categoryId: category }),
    queryKey: ["review", page, category]
  });

  return (
    <>
      {isReviewLoading ? (
        <div className="min-h-[300px]">
          <Spinner />
        </div>
      ) : (
        <>
          <SelectCategory currentPage={page} />
          <ReviewList searchParams={searchParams} reviewList={reviewList.reviews} />
          <Pagination maxPage={reviewList.maxPage} limit={10} currentPage={page} articleName={category} />
        </>
      )}
    </>
  );
};

export default AdminReview;
