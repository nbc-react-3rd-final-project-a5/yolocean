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
export {
  getAllProductReview,
  getAllUserReview,
  createUserReview,
  getUserReview,
  updateUserReview,
  deleteUserReview,
  getFixedReview
};
