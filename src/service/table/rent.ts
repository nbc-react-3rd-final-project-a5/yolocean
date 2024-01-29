import { API } from "@/types/api";

interface ExtendAPI extends API {
  isReturn: boolean;
}

const getAllUserRent = async ({ userId, isReturn }: Pick<ExtendAPI, "userId" | "isReturn">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/rent?isReturn=${isReturn}`, {
    method: "GET"
  });
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
