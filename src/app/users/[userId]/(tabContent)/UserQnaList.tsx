"use client";

import React, { Suspense, useEffect, useState } from "react";
import ReviewList from "@/components/review/ReviewList";
import { getAllUserQna } from "@/service/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import UserRentPulse from "@/components/pulse/UserRentPulse";
import Pagenation from "@/components/Pagenation";
import { useCustomMutation } from "@/hook";
import { useSearchParams } from "next/navigation";
// import UserPagenation from "./UserPagenation";

interface Props {
  userId: string;
  article: string;
}

const UserQnaList = ({ userId, article }: Props) => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const [page, setPage] = useState<number>(currentPage);

  const { data, isLoading, refetch } = useSuspenseQuery({
    queryKey: ["qna", userId],
    queryFn: async () => await getAllUserQna({ userId, page })
  });

  const { qna: qnaList, maxPage } = data;

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
          <ReviewList listType="qna" reviewList={qnaList} currentUserId={userId} />
        ) : (
          <div className="w-full text-center text-[18px] font-semibold"> 작성된 문의가 없습니다 😅</div>
        )}
      </Suspense>
      <Suspense>
        <Pagenation {...pageProps} />
      </Suspense>
    </>
  );
};

export default UserQnaList;
