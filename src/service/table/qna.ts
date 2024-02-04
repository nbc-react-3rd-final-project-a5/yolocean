import { API } from "@/types/api";

// [GET] 상품에 해당하는 모든 문의
const getAllProductQna = async ({ productId, page = 1 }: Pick<API, "productId" | "page">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product/${productId}/qna?page=${page}`, {
    next: { tags: [productId, "qna"] }
  });
  const result = await res.json();
  return result;
};
const getAllQna = async ({ category, answer, page }: { category?: string; answer?: string; page: number }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/qna?page=${page}&answer=${answer}&category=${category}`
  );
  const result = await res.json();
  return result;
};

const getAdminProductQna = async ({
  categoryId,
  page = 1,
  answer
}: {
  categoryId: Pick<API, "categoryId">;
  page: number;
  answer: string;
}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/qna/${categoryId}?page=${page}&answer=${answer}`
  );
  const result = await res.json();
  return result;
};
// [CREATE] 유저가 문의 생성
const createUserQna = async ({ userId, body }: Pick<API, "userId" | "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna`, {
    method: "POST",
    body
  });
  const result = await res.json();
  return result;
};

// [GET] 유저의 모든 문의
const getAllUserQna = async ({ userId, page }: Pick<API, "userId" | "page">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna?page=${page}`, {
    next: { tags: ["user", "qna"] },
    cache: "no-store"
  });
  const result = await res.json();
  return result;
};

// [GET] 유저의 단일 문의
const getUserQna = async ({ userId, qnaId }: Pick<API, "userId" | "qnaId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/qna/${qnaId}`, {
    cache: "no-store"
  });
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

export {
  getAllProductQna,
  createUserQna,
  getUserQna,
  getAllUserQna,
  updateUserQna,
  deleteUserQna,
  getAllQna,
  getAdminProductQna
};
