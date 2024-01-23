import { API } from "@/types/api";

const getUser = async ({ userId }: Pick<API, "userId">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}`, {
    method: "GET"
  });
  const result = await response.json();
  return result;
};

const updateUser = async ({ userId, body }: Pick<API, "userId" | "body">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}`, {
    method: "PATCH",
    body
  });
  const result = await response.json();
  return result;
};

export { getUser, updateUser };
