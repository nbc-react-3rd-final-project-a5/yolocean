"use client";

import ReviewForm from "@/components/form/ReviewForm";
import React, { useEffect } from "react";
import Section from "@/components/layout/Section";
import QnaForm from "../../[reviewId]/QnaForm";
import { useStore } from "zustand";
import { useAuthStore } from "@/store/authStore";
import { useParams } from "next/navigation";
import Image from "next/image";

const QnaPage = () => {
  const { auth } = useStore(useAuthStore);
  const { productId } = useParams<{ productId: string }>();

  return (
    <>
      <Section title={"1:1 문의하기"} className="font-[600] text-[25px] leading-none" isCenter={true}>
        <QnaForm formType="qna" userId={auth} productId={productId} />
      </Section>
    </>
  );
};

export default QnaPage;
