import React from "react";
import ReviewList from "@/components/review/ReviewList";
import { getAllUserQna } from "@/service/table";

interface Props {
  userId: string;
}

const UserQnaList = async ({ userId }: Props) => {
  const qnaList = await getAllUserQna({ userId, page: 1 });

  return (
    <>
      {qnaList?.length > 0 ? (
        <ReviewList listType="qna" reviewList={qnaList} currentUserId={userId} />
      ) : (
        <div className="w-full text-center text-[18px] font-semibold"> 작성된 문의가 없습니다 😅</div>
      )}
    </>
  );
};

export default UserQnaList;
