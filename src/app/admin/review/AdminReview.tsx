"use client";
import React from "react";
import ReviewList from "./ReviewList";
import SelectCategory from "./SelectCategory";
import { getAllReview } from "@/service/table";
import Pagination from "@/components/Pagination";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import SelectOrder from "./SelectOrder";

interface Props {
  searchParams: { [key: string]: any } | undefined;
}

const AdminReview = ({ searchParams }: Props) => {
  const page = searchParams?.["page"] || "1";
  const category = searchParams?.["category"] || "";
  const order = searchParams?.["order"] || "";

  const { data: reviewList, isLoading: isReviewLoading } = useQuery({
    queryFn: async () => await getAllReview({ page, categoryId: category, order }),
    queryKey: ["review", page, category, order]
  });

  return (
    <>
      {isReviewLoading ? (
        <div className="min-h-[300px]">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="flex mt-[30px] space-x-[20px] ml-[75%]">
            <SelectOrder currentPage={page} article={"review"} target={{ category: category }} order={order} />
            <SelectCategory currentPage={page} category={category} order={order} />
          </div>
          <ReviewList searchParams={searchParams} reviewList={reviewList.reviews} />
          <Pagination
            maxPage={reviewList.maxPage}
            limit={10}
            currentPage={page}
            articleName={"review"}
            categoryId={category}
            order={order}
          />
        </>
      )}
    </>
  );
};

export default AdminReview;
