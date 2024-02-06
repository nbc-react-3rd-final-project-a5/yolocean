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
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product/category/${categoryId}`, {
    next: { revalidate: 60 * 60 }
  });
  const result = await res.json();
  return result;
};

// [UPDATE] 새 상품 생성, 관리자 및 조회수용
const updateProduct = async ({ body, productId }: Pick<API, "body" | "productId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product/${productId}`, {
    method: "PATCH",
    body
  });
  const result = res.json();
  return result;
};
// [관리자]
// [GET] 모든 상품 페이지네이션으로 가져오기
const getProductByPage = async ({ page = 1 }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/product?page=${page}`);
  const result = await res.json();
  return result;
};
// [CREATE] 새 상품 생성
const createProduct = async ({ body }: Pick<API, "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/product`, { method: "POST", body });
  const result = res.json();
  return result;
};

// [DELETE] 상품 삭제
const deleteProduct = async ({ productId }: Pick<API, "productId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/admin/product/${productId}`, { method: "DELETE" });
  const result = res.json();
  return result;
};

export {
  getAllCategoryProduct,
  getProduct,
  getAllProduct,
  createProduct,
  getProductByPage,
  updateProduct,
  deleteProduct
};
