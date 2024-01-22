import React from "react";
import getPath from "@/utils/getPath";
import ReviewList from "@/components/review/ReviewList";

interface Props {
  userId: string;
}

// 현재 문제 발생

const getUserQnaList = async (domain: string, userId: string) => {
  const res = await fetch(`http://${domain}/api/qna/user/${userId}`);
  const data = await res.json();
  console.log(data);
  return data;
};

const UserQnaList = async ({ userId }: Props) => {
  const { domain } = getPath();
  const qnaList = await getUserQnaList(domain, userId);

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
