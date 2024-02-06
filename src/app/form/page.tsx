import React from "react";
import ProductInfo from "./ProductInfo";
import FormSwitch from "./FormSwitch";
import { getUserQna, getUserReview } from "@/service/table";
import { ExtendQna, ExtendReview } from "@/types/db";
import { Metadata, ResolvingMetadata } from "next";
import { revalidateTag } from "next/cache";
import Section from "@/components/layout/Section";

interface Props {
  searchParams?: { [key: string]: string | undefined };
}

export async function generateMetadata({ searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const formtype = searchParams?.formtype;
  const reviewId = searchParams?.reviewId;

  const metadataFormtype = formtype === "review" || reviewId ? "리뷰작성" : "문의작성";
  return {
    title: `YOLOCEAN | ${metadataFormtype}`,
    description: `더 나은 YOLOCEAN을 위해 ${metadataFormtype}을 진행해주세요`,
    openGraph: {
      images: [`/opengraph-image.png`]
    }
  };
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
  revalidateTag("review");
  revalidateTag("qna");

  const userId = searchParams!.userId!;

  const reviewId = searchParams?.reviewId;
  const reivewData: ExtendReview = reviewId && (await getUserReview({ userId, reviewId }))[0];
  const qnaId = searchParams?.qnaId;
  const qnaData: ExtendQna = qnaId && (await getUserQna({ userId, qnaId }));
  const storeId: string = (searchParams?.storeId || reivewData?.store_id)!;
  const productId = searchParams?.productId || reivewData?.product_id || qnaData?.product_id;
  const formtype = searchParams?.formtype || (reivewData && "review") || (qnaData && "qna");

  return (
    <>
      <Section title={null}>
        {productId && <ProductInfo productId={productId} />}
        <FormSwitch
          productId={productId!}
          formtype={formtype}
          reivewData={reivewData}
          qnaData={qnaData}
          storeId={storeId}
        />
      </Section>
    </>
  );
};

export default FormPage;
