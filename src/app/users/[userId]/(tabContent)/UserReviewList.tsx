import Pagination from "@/components/Pagination";
import Revalidate from "@/components/Revalidate";
import ReviewList from "@/components/review/ReviewList";
import { getAllUserReview } from "@/service/table";
import { revalidateTag } from "next/cache";
import React from "react";

interface Props {
  userId: string;
  article: string;
  page: number;
}

const UserReviewList = async ({ userId, article, page }: Props) => {
  revalidateTag("userReview");
  const data = await getAllUserReview({ userId, page });
  const { review: reviewList, maxPage } = data;

  const pageProps = {
    articleName: article,
    maxPage,
    currentPage: page,
    limit: 5
  };

  return (
    <>
      <Revalidate />
      {reviewList?.length > 0 ? (
        <ReviewList listType="review" reviewList={reviewList} currentUserId={userId} isMypage={true} />
      ) : (
        <div className="w-full text-center text-[18px] font-semibold"> 작성된 리뷰가 없습니다 😅</div>
      )}
      <Pagination {...pageProps} />
    </>
  );
};

export default UserReviewList;
