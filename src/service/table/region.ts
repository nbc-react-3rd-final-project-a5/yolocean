// [GET] 지역 선택 시 보여줄 모든 지역 가져오기
const getAllRegion = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/store/region`, {
    method: "GET",
    next: { revalidate: 60 * 60 }
  });
  const data = await res.json();
  return data;
};

export { getAllRegion };
