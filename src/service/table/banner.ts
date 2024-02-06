import { Banner } from "@/types/db";

export const getBanner = async (bannerName: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/banner/${bannerName}`, {
      next: { revalidate: 60 * 60 }
    });
    const data: Banner = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateBanner = async (
  bannerName: string,
  bannerData: Pick<Banner, "banner_link" | "banner_name" | "banner_url">
) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/banner/${bannerName}`, {
      method: "POST",
      body: JSON.stringify(bannerData)
    });
    const data: string = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteBanner = async (bannerName: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/banner/${bannerName}`, {
      method: "DELETE"
    });
    const data: string = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllBanner = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/banner`);
    const data: Banner[] = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const createBanner = async (newBanner: Omit<Banner, "id">) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/banner`, {
      method: "POST",
      body: JSON.stringify(newBanner)
    });
    const data: string = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
