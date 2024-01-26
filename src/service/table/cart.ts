import { API } from "@/types/api";

const getAllCart = async ({ userId }: Pick<API, "userId">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/cart`, { method: "GET" });
  const result = await response.json();
  console.log("getAllCart:", result);
  return result;
};

const deleteAllCart = async ({ userId }: Pick<API, "userId">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/cart`, { method: "DELETE" });
  const result = await response.json();
  return result;
};

const createCart = async ({ userId, body }: Pick<API, "userId" | "body">) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/cart`, {
    method: "POST",
    body
  });
  console.log(response);
  const result = await response.json();
  return result;
};

const getCart = async ({ userId, productId }: Pick<API, "userId" | "productId">) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/user/${userId}/cart/cartId?productId=${productId}`,
    { method: "GET" }
  );
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

export { getAllCart, deleteAllCart, createCart, updateCart, deleteCart, getCart };
