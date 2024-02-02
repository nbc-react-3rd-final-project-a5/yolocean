"use client";
import React from "react";
import ReviewList from "./ReviewList";

import { getAllReview } from "@/service/table";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";

interface Props {
  searchParams: { [key: string]: any } | undefined;
}

const AdminReview = ({ searchParams }: Props) => {
  const page = searchParams?.["page"] || 1;

  const { data: reviewList, isLoading } = useQuery({
    queryFn: async () => await getAllReview({ page }),
    queryKey: ["review", page]
  });

  return (
    <>
      {isLoading ? (
        <div className="min-h-[300px]">
          <Spinner />
        </div>
      ) : (
        <>
          <ReviewList searchParams={searchParams} reviewList={reviewList.reviews} />
          <Pagination maxPage={reviewList.maxPage} limit={10} currentPage={page} articleName="review" />
        </>
      )}
    </>
  );
};

export default AdminReview;
