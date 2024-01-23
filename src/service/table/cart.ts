import { API } from "@/types/api";

const getAllCart = async ({ userId }: Pick<API, "userId">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/cart`, { method: "GET" });
  const result = await response.json();
  return result;
};

const deleteAllCart = async ({ userId }: Pick<API, "userId">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/cart`, { method: "DELETE" });
  const result = await response.json();
  return result;
};

const createCart = async ({ userId, cartId, body }: Pick<API, "userId" | "cartId" | "body">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/cart/${cartId}`, {
    method: "POST",
    body
  });
  const result = await response.json();
  return result;
};

const updateCart = async ({ userId, cartId, body }: Pick<API, "userId" | "cartId" | "body">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/cart/${cartId}`, {
    method: "PATCH",
    body
  });
  const result = await response.json();
  return result;
};

const deleteCart = async ({ userId, cartId }: Pick<API, "userId" | "cartId">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/cart/${cartId}`, {
    method: "DELETE"
  });
  const result = await response.json();
  return result;
};

export { getAllCart, deleteAllCart, createCart, updateCart, deleteCart };
