import React from "react";
import CategorySection from "./CategorySection";
import CategoryHeader from "./CategoryHeader";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { categoryId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const categoryId = params.categoryId;
  const categoryName = await getCategoryName({ categoryId });
  return {
    title: `YOLOCEAN | ${categoryName}`,
    description: `${categoryName} 상품목록입니다.`,
    openGraph: {
      images: [`${process.env.PUBLIC_URL}/images/opengraph-image.png`]
    }
  };
}

const getCategoryName = async ({ categoryId }: { categoryId: string }): Promise<string> => {
  const result = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/api/category/${categoryId}`, { method: "GET" });
  if (!result.ok) {
    throw new Error("카테고리 데이터 불러오기 실패");
  }
  return result.json();
};

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const categoryName = await getCategoryName({ categoryId: params.categoryId });
  return (
    <div>
      <CategoryHeader categoryName={categoryName} />
      <CategorySection categoryName={categoryName} categoryId={params.categoryId} />
    </div>
  );
};

export default CategoryPage;
