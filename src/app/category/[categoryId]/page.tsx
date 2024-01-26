import React from "react";
import CategorySection from "./CategorySection";
import CategoryHeader from "./CategoryHeader";

const getCategoryName = async ({ categoryId }: { categoryId: string }): Promise<string> => {
  const result = await fetch(`https://yolocean.vercel.app/api/category/${categoryId}`, { method: "GET" });
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
