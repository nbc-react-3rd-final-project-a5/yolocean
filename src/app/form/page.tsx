import React from "react";
import ProductInfo from "./ProductInfo";
import FormSwitch from "./FormSwitch";
import { getUserQna, getUserReview } from "@/service/table";
import { ExtendQna, ExtendReview, Qna } from "@/types/db";

interface Props {
  searchParams?: { [key: string]: string | undefined };
}

// [========== 필요한 searchParams 값 ==========]
// [review]
// 생성
// storeId, productId

// 수정
// reivewId

// [qna]
// 생성
// userId , (productId : 있으면 상품 product Qna 없으면 고객센터 Qna)

// 수정
// qnaId

const FormPage = async ({ searchParams }: Props) => {
  // TODO : 구현해야하는 기능
  // 1) 페이지에 접속한 사람의 userId 값을 얻고
  // 2) reviewId 나 qnaId 가 있을 경우 접속한 사람의 userId와 같은지 확인하는 작업
  const userId = searchParams?.userId || "7ddac094-5da5-4626-b0bc-49bbaae264ab";

  const reviewId = searchParams?.reviewId;
  const reivewData: ExtendReview = reviewId && (await getUserReview({ userId, reviewId }))[0];
  const qnaId = searchParams?.qnaId;
  const qnaData: ExtendQna = qnaId && (await getUserQna({ userId, qnaId }));
  const storeId: string = (searchParams?.storeId || reivewData?.store_id)!;
  const productId = searchParams?.productId || reivewData?.product_id || qnaData?.product_id;
  const formtype = searchParams?.formtype || (reivewData && "review") || (qnaData && "qna");

  // form 을 작성하기 위한 데이터가 제공되었는지 확인하는 validate
  // const validateFormType = () => {
  //   switch (formtype) {
  //     case "review":
  //       return !!productId && !!storeId;
  //     case "qna":
  //       return true;
  //     default:
  //       return false;
  //   }
  // };

  // if (!validateFormType()) return <>잘못된 접근입니다.</>;

  return (
    <>
      {productId && <ProductInfo productId={productId} />}
      <FormSwitch
        productId={productId}
        formtype={formtype}
        reivewData={reivewData}
        qnaData={qnaData}
        storeId={storeId}
      />
    </>
  );
};

export default FormPage;
