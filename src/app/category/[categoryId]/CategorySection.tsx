import CardLists from "@/components/CardLists";
import Section from "@/components/layout/Section";
import { getAllCategoryProduct } from "@/service/table";
import React from "react";

const CategorySection = async ({ categoryName, categoryId }: { categoryName: string; categoryId: string }) => {
  const products = await getAllCategoryProduct({ categoryId });

  return (
    <Section title={`${categoryName}`} isCenter={true}>
      <CardLists cardLists={products} />
    </Section>
  );
};

export default CategorySection;
