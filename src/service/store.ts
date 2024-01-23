import { API } from "@/types/api";

// [GET] 모든 store 가져오기
// [관리자용]
const getAllStore = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/store`, { method: "GET" });
  const data = await res.json();
  return data;
};

const createStore = async ({ body }: Pick<API, "body">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/store`, {
    method: "POST",
    body
  });
  const result = await res.json();
  return result;
};

// [GET] 지역 선택 후 해당하는 store 가져오기
const getAllStoreByRegion = async ({ regionId }: Pick<API, "regionId">) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/store/region/${regionId}`, { method: "GET" });
  const data = await res.json();
  return data;
};



export { getAllStore, getAllStoreByRegion, createStore };
