import { Carousel } from "@/types/db";

export const getAllCarousel = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/carousel`, {
    next: { revalidate: 60 * 60 }
  });
  const result: Carousel[] = await res.json();
  return result;
};

export const createCarousel = async (carousel: Omit<Carousel, "id">) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/carousel`, {
      method: "POST",
      body: JSON.stringify(carousel)
    });

    const data: string = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateCarousel = async (carouselData: Carousel) => {
  const carouselId = carouselData.id;
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/carousel/${carouselId}`, {
      method: "POST",
      body: JSON.stringify(carouselData)
    });

    const data: string = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCarousel = async (carouselId: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/storage/carousel/${carouselId}`, {
      method: "DELETE"
    });

    const data: string = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
