import { API } from "@/types/api";

// [GET] 상품에 해당하는 모든 문의
const getAllProductQna = async ({ productId, page = 1 }: Pick<API, "productId" | "page">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product/${productId}/qna?page=${page}`, {
    method: "GET"
  });
  const result = await res.json();
  return result;
};

// [CREATE] 유저가 문의 생성
const createUserQna = async ({ userId, body }: Pick<API, "userId" | "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna`, {
    method: "POST",
    body
  });
  console.log(res);
  const result = await res.json();
  return result;
};

// [GET] 유저의 모든 문의
const getAllUserQna = async ({ userId, page }: Pick<API, "userId" | "page">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna?page=${page}`, {
    method: "GET"
  });
  const result = await res.json();
  return result;
};

// [GET] 유저의 단일 문의
const getUserQna = async ({ userId, qnaId }: Pick<API, "userId" | "qnaId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna/${qnaId}`);
  const result = await res.json();
  return result;
};

// [UPDATE] 유저 문의 수정
const updateUserQna = async ({ userId, body, qnaId }: Pick<API, "userId" | "body" | "qnaId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna/${qnaId}`, {
    method: "PATCH",
    body
  });
  const result = await res.json();
  return result;
};
// [DELETE] 유저 문의 삭제
const deleteUserQna = async ({ userId, qnaId }: Pick<API, "userId" | "qnaId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna/${qnaId}`, {
    method: "DELETE"
  });
  const result = await res.json();
  return result;
};

export { getAllProductQna, createUserQna, getUserQna, getAllUserQna, updateUserQna, deleteUserQna };
