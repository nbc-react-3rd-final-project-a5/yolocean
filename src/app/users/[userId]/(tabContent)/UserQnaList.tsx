"use client";

import React, { Suspense, useEffect, useState } from "react";
import ReviewList from "@/components/review/ReviewList";
import { getAllUserQna } from "@/service/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import UserRentPulse from "@/components/pulse/UserRentPulse";
import Pagination from "@/components/Pagination";
import { useCustomMutation } from "@/hook";
import { useSearchParams } from "next/navigation";

interface Props {
  userId: string;
  article: string;
}

const UserQnaList = ({ userId, article }: Props) => {
  const [page, setPage] = useState<number>(1);

  const {
    data: { qna: qnaList, maxPage },
    isLoading,
    refetch
  } = useSuspenseQuery({
    queryKey: ["qna", userId],
    queryFn: async () => await getAllUserQna({ userId, page })
  });

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
      <Suspense fallback={<UserRentPulse />}>
        {qnaList?.length > 0 ? (
          <>
            <ReviewList listType="qna" reviewList={qnaList} currentUserId={userId} isMypage={true} />

            <Pagination {...pageProps} />
          </>
        ) : (
          <div className="w-full text-center text-[18px] font-semibold"> 작성된 문의가 없습니다 😅</div>
        )}
      </Suspense>
    </>
  );
};

export default UserQnaList;
