import { API } from "@/types/api";

interface ExtendAPI extends API {
  isReturn: boolean;
  storeId: string;
  rentId: string;
}

const getAllUserRent = async ({ userId, isReturn, page = 1 }: Pick<ExtendAPI, "userId" | "isReturn" | "page">) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/rent?isReturn=${isReturn}&page=${String(page)}`,
    {
      next: { tags: ["user", "userRent"] }
    }
  );
  const result = await response.json();
  return result;
};

const createAllUserRent = async ({ userId, body }: Pick<API, "userId" | "body">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/rent`, {
    method: "POST",
    body
  });
  const result = await response.json();
  return result;
};

//전체 렌트 가져오기
const getAllRent = async ({ page = 1, storeId = "", order = false }: Pick<ExtendAPI, "page" | "storeId" | "order">) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/rent?page=${page}&store=${storeId}&order=${order}`
  );
  const allRent = await res.json();
  return allRent;
};

//렌트 반납 수정
const updateReturnRent = async ({ rentId, body }: Pick<ExtendAPI, "rentId" | "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/rent/${rentId}`, {
    method: "PATCH",
    body
  });
  const data = await res.json();
  return data;
};

export { getAllUserRent, createAllUserRent, getAllRent, updateReturnRent };
