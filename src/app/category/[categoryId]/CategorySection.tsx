"use client";
import Card from "@/components/Card";
import Section from "@/components/layout/Section";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const CategorySection = ({ categoryName, categoryId }: { categoryName: string; categoryId: string }) => {
  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await fetch(`/api/products/${categoryId}`);
      const result = await res.json();
      return result;
    },
    queryKey: ["products", categoryId]
  });

  return (
    <Section title={`${categoryName}`} isCenter={true}>
      <div className="grid grid-cols-4 gap-[30px]">
        {!isLoading && data && data.map((item: any) => <Card product={item} key={item.id} />)}
      </div>
    </Section>
  );
};

export default CategorySection;
