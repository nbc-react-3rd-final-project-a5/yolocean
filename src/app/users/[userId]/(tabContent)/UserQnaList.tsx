import React from "react";
import ReviewList from "@/components/review/ReviewList";
import { getAllUserQna } from "@/service/table";

import Pagination from "@/components/Pagination";

import { revalidateTag } from "next/cache";

interface Props {
  userId: string;
  article: string;
  page: number;
}

const UserQnaList = async ({ userId, article, page }: Props) => {
  revalidateTag("userQna");
  const data = await getAllUserQna({ userId, page });
  const { qna: qnaList, maxPage, nextPage, prevPage } = data;

  const pageProps = {
    articleName: article,
    maxPage,
    currentPage: page,
    limit: 5
  };

  return (
    <>
      {qnaList?.length > 0 ? (
        <>
          <ReviewList listType="qna" reviewList={qnaList} currentUserId={userId} isMypage={true} />
          <Pagination {...pageProps} />
        </>
      ) : (
        <div className="w-full text-center text-[18px] font-semibold"> 작성된 문의가 없습니다 😅</div>
      )}
    </>
  );
};

export default UserQnaList;
