import React from "react";

const CategoryPage = ({ params }: { params: { categoryId: string } }) => {
  return <div>{params.categoryId}</div>;
};

export default CategoryPage;
