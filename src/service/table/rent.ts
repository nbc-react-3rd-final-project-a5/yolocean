import { API } from "@/types/api";

interface ExtendAPI extends API {
  isReturn: boolean;
}

const getAllUserRent = async ({ userId, isReturn, page = 1 }: Pick<ExtendAPI, "userId" | "isReturn" | "page">) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/rent?isReturn=${isReturn}&page=${String(page)}`,
    {
      method: "GET",
      cache: "no-store"
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

export { getAllUserRent, createAllUserRent };
