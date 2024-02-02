import { API } from "@/types/api";
import { ExtendFixedReview } from "@/types/db";

const getAllProductReview = async ({ productId, page = 1 }: Pick<API, "productId" | "page">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product/${productId}/review?page=${page}`, {
    next: { tags: [productId, "review"] }
  });
  const data = await res.json();

  return data;
};

const getAllUserReview = async ({ userId, page = 1 }: Pick<API, "userId" | "page">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/review?page=${page}`, {
    next: { tags: ["user", "review"] }
  });
  const data = await res.json();
  return data;
};

const createUserReview = async ({ userId, body }: Pick<API, "userId" | "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/review`, {
    method: "POST",
    body
  });
  const data = await res.json();
  return data;
};

const getUserReview = async ({ userId, reviewId }: Pick<API, "userId" | "reviewId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/review/${reviewId}`, {
    cache: "no-store"
  });
  const data = await res.json();
  return data;
};

const updateUserReview = async ({ userId, reviewId, body }: Pick<API, "userId" | "reviewId" | "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/review/${reviewId}`, {
    method: "PATCH",
    body: body
  });
  const data = await res.json();
  return data;
};

const deleteUserReview = async ({ userId, reviewId }: Pick<API, "userId" | "reviewId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/review/${reviewId}`, {
    method: "DELETE"
  });
  const data = await res.json();
  return data;
};

const getFixedReview = async (): Promise<ExtendFixedReview[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product/fixedReview`);
  const data = await res.json();
  return data;
};

//고정 리뷰 해제
const deleteFixedReview = async ({ reviewId }: Pick<API, "reviewId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/review/${reviewId}`, { method: "DELETE" });
  const data = await res.json();
  return res;
};

//리뷰 고정
const createFixedReview = async ({ reviewId, body }: Pick<API, "reviewId" | "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/review/${reviewId}`, {
    method: "POST",
    body
  });
  const data = await res.json();
  return data;
};

//리뷰 블라인드
const updateBlindReview = async ({ reviewId, body }: Pick<API, "reviewId" | "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/review/${reviewId}`, {
    method: "PATCH",
    body
  });
  const data = await res.json();
  return data;
};

//리뷰 전체 가져오기
const getAllReview = async ({ page = 1, categoryId = "" }: Pick<API, "page" | "categoryId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/review?page=${page}&category=${categoryId}`);
  const allReview = await res.json();
  return allReview;
};

export {
  getAllProductReview,
  getAllUserReview,
  createUserReview,
  getUserReview,
  updateUserReview,
  deleteUserReview,
  getFixedReview,
  getAllReview,
  deleteFixedReview,
  createFixedReview,
  updateBlindReview
};
