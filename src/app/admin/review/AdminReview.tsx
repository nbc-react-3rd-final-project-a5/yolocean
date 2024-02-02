import React from "react";
import ReviewList from "./ReviewList";

import { getAllReview } from "@/service/table";
import Pagination from "@/components/Pagination";

interface Props {
  searchParams: { [key: string]: any } | undefined;
}

const AdminReview = async ({ searchParams }: Props) => {
  const page = searchParams?.["page"] || 1;
  const { reviews: reviewList, maxPage, nextPage, prevPage } = await getAllReview({ page });

  return (
    <>
      <ReviewList searchParams={searchParams} reviewList={reviewList} />
      <Pagination maxPage={maxPage} limit={10} currentPage={page} articleName="" />
    </>
  );
};

export default AdminReview;
