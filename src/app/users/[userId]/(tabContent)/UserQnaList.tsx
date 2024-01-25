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
        "작성된 리뷰가 없습니다."
      )}
    </>
  );
};

export default UserQnaList;
