import React from "react";
import CategorySection from "./CategorySection";

const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
  return (
    <div>
      <CategorySection categoryId={params.categoryId} />
    </div>
  );
};

export default CategoryPage;
