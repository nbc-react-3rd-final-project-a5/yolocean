"use client";
import Section from "@/components/layout/Section";
import { getCategoryNameById } from "@/hooks/useCategory";
import React from "react";

const CategorySection = ({ categoryId }: { categoryId: string }) => {
  const { categoryName } = getCategoryNameById(categoryId);
  const data = categoryName;
  return <Section title={`${data}`}>모달 오픈 버튼</Section>;
};

export default CategorySection;
