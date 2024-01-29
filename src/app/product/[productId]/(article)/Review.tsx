"use client";
import Pagenation from "@/components/Pagenation";
import ReviewPulse from "@/components/pulse/ReviewPulse";
import ReviewList from "@/components/review/ReviewList";
import { useCustomMutation } from "@/hook";
import { getAllProductReview } from "@/service/table";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Empty from "./Empty";

interface Props {
  productId: string;
}
const Review = ({ productId }: Props) => {
  const [page, setPage] = useState(1);
  const { auth } = useAuthStore();
  const {
    data: review,
    isLoading,
    refetch
  } = useQuery({
    queryFn: async () => await getAllProductReview({ productId, page }),
    queryKey: ["review", productId, page]
  });

  return (
    <div>
      {isLoading && Array.from({ length: 6 }).map((e, i) => <ReviewPulse key={i} />)}
      {review && !isLoading && (
        <>
          {review.maxPage === 0 && <Empty articleName="후기" />}

          <ReviewList currentUserId={auth} reviewList={review.review} listType="review" />
          <Pagenation articleName={"후기"} setPage={setPage} maxPage={review.maxPage} currentPage={page} limit={5} />
        </>
      )}
    </div>
  );
};

export default Review;
