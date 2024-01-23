import { API } from "@/types/api";

// [GET] 상품에 해당하는 모든 리뷰
const getAllProductQna = async ({ productId, page = 1 }: Pick<API, "productId" | "page">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product/${productId}/qna?page=${page}`, {
    method: "GET"
  });
  const result = await res.json();
  return result;
};

// [CREATE] 유저가 리뷰 생성
const createUserQna = async ({ userId, body }: Pick<API, "userId" | "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna`, {
    method: "POST",
    body
  });
  const result = await res.json();
  return result;
};

// [GET] 유저의 모든 리뷰
const getAllUserQna = async ({ userId, page }: Pick<API, "userId" | "page">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna?page=${page}`, {
    method: "GET"
  });
  const result = await res.json();
  return result;
};

// [GET] 유저의 단일 리뷰
const getUserQna = async ({ userId, qnaId }: Pick<API, "userId" | "qnaId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna/${qnaId}`, {
    method: "GET"
  });
  const result = await res.json();
  return result;
};

// [UPDATE] 유저 리뷰 수정
const updateUserQna = async ({ userId, body, qnaId }: Pick<API, "userId" | "body" | "qnaId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna/${qnaId}`, {
    method: "PATCH",
    body
  });
  const result = await res.json();
  return result;
};

export { getAllProductQna, createUserQna, getUserQna, getAllUserQna, updateUserQna };
