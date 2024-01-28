"use client";

import React from "react";
import ReviewList from "@/components/review/ReviewList";
import { getAllUserQna } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
// import Pagenation from "@/components/Pagenation";
// import UserPagenation from "./UserPagenation";

interface Props {
  userId: string;
  searchParams: { [key: string]: any } | undefined;
}

const UserQnaList = ({ userId, searchParams }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["qna", userId],
    queryFn: async () => await getAllUserQna({ userId, page: Number(searchParams?.page) || 1 })
  });

  if (isLoading) return <></>;
  const { qna: qnaList, maxPage, nextPage, prevPage } = data;

  return (
    <>
      <>{maxPage}</>
      <>{nextPage}</>
      <>{prevPage}</>
      {qnaList?.length > 0 ? (
        <ReviewList listType="qna" reviewList={qnaList} currentUserId={userId} />
      ) : (
        <div className="w-full text-center text-[18px] font-semibold"> 작성된 문의가 없습니다 😅</div>
      )}
      {/* <UserPagenation maxPage={maxPage}></UserPagenation> */}
    </>
  );
};

export default UserQnaList;
