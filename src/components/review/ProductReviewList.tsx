import React from "react";
import getPath from "@/utils/getPath";
import ReviewList from "@/components/review/ReviewList";

interface Props {
  productId: string;
}

const getReviewList = async (domain: string, productId: string) => {
  const res = await fetch(`http://${domain}/api/review/products/${productId}`);
  const data = await res.json();
  return data;
};

/**
 * [서버컴포넌트] productId 기반 상품 리스트
 * @param param0 productId
 * @returns productId의 reviewList
 */
// TODO : 페이지네이션 추가
const ProductReviewList = async ({ productId }: Props) => {
  const { domain } = getPath();
  const reviewList = await getReviewList(domain, productId);

  return <ReviewList reviewList={reviewList} reviewType="product" />;
};

export default ProductReviewList;
