import { API } from "@/types/api";

const getAllUserRent = async ({ userId }: Pick<API, "userId">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/rent`, { method: "GET" });
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
