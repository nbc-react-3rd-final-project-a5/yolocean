"use client";
import Card from "@/components/Card";
import Section from "@/components/layout/Section";
import { useOfficeStore } from "@/store/officeStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useStore } from "zustand";

const CategorySection = ({ categoryName, categoryId }: { categoryName: string; categoryId: string }) => {
  const { office } = useStore(useOfficeStore);

  // const {} = useMutation({
  //   mutationFn: async () => {

  //   },
  //   mutationKey: office.id ? ["products", categoryId] : ["products", categoryId, office.id]
  // });
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      if (office.id) {
        const res = await fetch(`/api/products/${categoryId}`);
        const result = await res.json();
        return result.filter((item: any) => {
          return item.stock[0]?.store_id === office.id;
        });
      } else {
        const res = await fetch(`/api/products/${categoryId}`);
        const result = await res.json();
        return result;
      }
    },
    queryKey: office.id ? ["products", categoryId] : ["products", categoryId, office.id]
  });

  useEffect(() => {
    refetch({});
  }, [office, refetch]);

  return (
    <Section title={`${categoryName}`} isCenter={true}>
      <div className="grid grid-cols-4 gap-[30px]">
        {!isLoading && data && data.map((item: any) => <Card categoryId={categoryId} product={item} key={item.id} />)}
      </div>
    </Section>
  );
};

export default CategorySection;
