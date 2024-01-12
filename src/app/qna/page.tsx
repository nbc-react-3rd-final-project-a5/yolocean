"use client";

import ReviewForm from "@/components/form/ReviewForm";
import React, { useEffect } from "react";
import Section from "@/components/layout/Section";

const QnaPage = () => {
  const userId = "3255837d-277c-4e5d-9e52-6956be86f182";
  const qnaProduct = "testqnad-277c-4e5d-9e52-6956be86f182";

  // TODO : 로그인 여부확인하기 & Qna product 코드 만들기

  return (
    <>
      <Section title={"1:1 문의하기"} className="font-[600] text-[25px] leading-none" isCenter={true}>
        <ReviewForm bucket="review" userId={userId} productId={qnaProduct} isReview={true} />
      </Section>
    </>
  );
};

export default QnaPage;
