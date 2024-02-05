import ReviewList from "@/components/review/ReviewList";
import { getAllProductReview } from "@/service/table";
import React, { Suspense } from "react";
import Empty from "./Empty";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Pagenation from "@/components/Pagination";
import ReviewPulse from "@/components/pulse/ReviewPulse";
import Revalidate from "../../../../components/Revalidate";

interface Props {
  productId: string;
  page: number;
}
const Review = async ({ productId, page }: Props) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore
  });

  const { user } = (await supabase.auth.getUser()).data;

  const { review, maxPage, nextPage, prevPage } = await getAllProductReview({ page, productId });

  return (
    <div>
      <Revalidate />
      <Suspense
        fallback={Array.from({ length: 6 }).map((e, i) => (
          <ReviewPulse key={i} />
        ))}
      >
        {maxPage === 0 && <Empty articleName="후기" />}
        <ReviewList currentUserId={user?.id} reviewList={review} listType="review" />
        <Pagenation articleName={"후기"} maxPage={maxPage} currentPage={page} limit={5} />
      </Suspense>
    </div>
  );
};

export default Review;
