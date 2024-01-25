"use client";
import Pagenation from "@/components/Pagenation";
import ReviewPulse from "@/components/pulse/ReviewPulse";
import ReviewList from "@/components/review/ReviewList";
import { getAllProductReview } from "@/service/table";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  productId: string;
}
const Review = ({ productId }: Props) => {
  // const searchParams = useSearchParams();
  // const page = Number(searchParams.get("review_page")) || 1;
  const [page, setPage] = useState(1);

  const { auth } = useAuthStore();
  const {
    data: review,
    isLoading,
    refetch
  } = useQuery({
    queryFn: async () => await getAllProductReview({ productId, page }),
    queryKey: ["review", productId]
  });

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const test = useSearchParams();
  console.log(test.get("article"));
  return (
    <div>
      {review && !isLoading && <ReviewList currentUserId={auth} reviewList={review.review} listType="review" />}
      {review && (
        <Pagenation articleName={"후기"} setPage={setPage} maxPage={review.maxPage} currentPage={page} limit={5} />
      )}
    </div>
  );
};

export default Review;
