import { API } from "@/types/api";

// [GET] 상품 정보
const getProduct = async ({ productId }: Pick<API, "productId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product/${productId}`);
  const result = await res.json();
  return result;
};
// [GET] Main 페이지에서 사용되는 모든 상품 정보
const getAllProduct = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product`);
  const result = await res.json();
  return result;
};
// [GET] 카테고리에 해당하는 상품 정보들
const getAllCategoryProduct = async ({ categoryId }: Pick<API, "categoryId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product/category/${categoryId}`);
  const result = await res.json();
  return result;
};

// [CREATE] 새 상품 생성
// [관리자]
const createProduct = async ({ body }: Pick<API, "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product`, { method: "POST", body });
  const result = res.json();
  return result;
};
export { getAllCategoryProduct, getProduct, getAllProduct, createProduct };
