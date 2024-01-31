import Pagenation from "@/components/Pagenation";
import ReviewList from "@/components/review/ReviewList";
import { getAllUserReview } from "@/service/table";
import { useSuspenseQuery } from "@tanstack/react-query";

import React, { Suspense, useEffect, useState } from "react";

interface Props {
  userId: string;
  article: string;
  page: number;
}

const UserReviewList = async ({ userId, article, page }: Props) => {
  const data = await getAllUserReview({ userId, page });
  const { review: reviewList, maxPage } = data;

  // const pageProps = {
  //   articleName: article,
  //   setPage,
  //   maxPage,
  //   currentPage: page,
  //   limit: 5
  // };

  return (
    <>
      {reviewList?.length > 0 ? (
        <ReviewList listType="review" reviewList={reviewList} currentUserId={userId} isMypage={true} />
      ) : (
        <div className="w-full text-center text-[18px] font-semibold"> 작성된 리뷰가 없습니다 😅</div>
      )}
      {/* <Pagenation {...pageProps} /> */}
    </>
  );
};

export default UserReviewList;
