import React from "react";
import ReviewList from "@/components/review/ReviewList";
import { getAllUserQna } from "@/service/table";
// import Pagenation from "@/components/Pagenation";
// import UserPagenation from "./UserPagenation";

interface Props {
  userId: string;
  searchParams: { [key: string]: any } | undefined;
}

const UserQnaList = async ({ userId, searchParams }: Props) => {
  const {
    qna: qnaList,
    maxPage,
    nextPage,
    prevPage
  } = await getAllUserQna({ userId, page: Number(searchParams?.page) || 1 });

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
