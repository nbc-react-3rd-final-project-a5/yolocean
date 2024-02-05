import { API } from "@/types/api";

const getAllCategory = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/category`, {
    method: "GET",
    next: { revalidate: 60 * 60 }
  });
  const data = await res.json();
  return data;
};

const getCategory = async ({ categoryId }: Pick<API, "categoryId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/category/${categoryId}`, { method: "GET" });
  const data = await res.json();
  return data;
};

export { getAllCategory, getCategory };
