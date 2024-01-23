import Pagenation from "@/components/Pagenation";
import ReviewList from "@/components/review/ReviewList";
import { getAllProductReview } from "@/service/table";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

interface Props {
  productId: string;
}
const Review = ({ productId }: Props) => {
  // const searchParams = useSearchParams();
  // const page = Number(searchParams.get("review_page")) || 1;
  const [page, setPage] = useState(1);

  const { auth } = useAuthStore();
  const { data: review, isLoading } = useQuery({
    queryFn: async () => await getAllProductReview({ productId, page }),
    queryKey: ["review", productId, page]
  });

  return (
    <div>
      {/* <Link href={`/review/product/${productId}`}>작성테스트</Link> */}
      {review && !isLoading && <ReviewList currentUserId={auth} reviewList={review.review} listType="review" />}
      {review && (
        <Pagenation articleName={"후기"} setPage={setPage} maxPage={review.maxPage} currentPage={page} limit={5} />
      )}
    </div>
  );
};

export default Review;
