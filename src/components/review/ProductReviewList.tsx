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

// productId만 전달해주시면 됩니다.
const ProductReviewList = async ({ productId }: Props) => {
  const { domain } = getPath();
  const reviewList = await getReviewList(domain, productId);

  return <ReviewList reviewList={reviewList} />;
};

export default ProductReviewList;
