"use client";

import Pagenation from "@/components/Pagenation";
import ReviewList from "@/components/review/ReviewList";
import { getAllUserReview } from "@/service/table";
import { useSuspenseQuery } from "@tanstack/react-query";

import React, { Suspense, useEffect, useState } from "react";

interface Props {
  userId: string;
  article: string;
}

const UserReviewList = ({ userId, article }: Props) => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useSuspenseQuery({
    queryKey: ["user", "review"],
    queryFn: async () => getAllUserReview({ userId, page: page })
  });

  const { review: reviewList, maxPage } = data;

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const pageProps = {
    articleName: article,
    setPage,
    maxPage,
    currentPage: page,
    limit: 5
  };

  return (
    <>
      <Suspense>
        {reviewList?.length > 0 ? (
          <>
            <ReviewList listType="review" reviewList={reviewList} currentUserId={userId} isMypage={true} />
            <Pagenation {...pageProps} />
          </>
        ) : (
          <div className="w-full text-center text-[18px] font-semibold"> 작성된 리뷰가 없습니다 😅</div>
        )}
      </Suspense>
    </>
  );
};

export default UserReviewList;
