export const getAllCarousel = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/carousel`);
  const result = await res.json();
  return result;
};
