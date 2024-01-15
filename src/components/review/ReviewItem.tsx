import Image from "next/image";
import React from "react";
import { ExtendReview } from "@/types/db";

interface Props {
  review: ExtendReview;
}

const ReviewItem = ({ review }: Props) => {
  const reviewImageList = review.url;
  return (
    <div className="relative">
      <p>{review.userinfo.username}</p>
      <p>{review.product.name}</p>
      <p>{review.title}</p>
      <p>{review.content}</p>
      {!!reviewImageList && (
        <ul>
          {reviewImageList.map((n, i) => (
            <li key={`${review.id}-${i}`}>
              <Image src={n} width={100} height={100} alt="리뷰 이미지" />
            </li>
          ))}
        </ul>
      )}
      <div className="absolute top-0 right-0">
        <p>{review.created_at}</p>
        <button className="p-4 bg-red-500">수정</button>
        <button className="p-4 bg-red-500">삭제</button>
      </div>
    </div>
  );
};

export default ReviewItem;
