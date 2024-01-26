import { Banner } from "@/types/db";

export const getBanner = async (bannerName: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/banner/${bannerName}`);
    const data: Banner = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
