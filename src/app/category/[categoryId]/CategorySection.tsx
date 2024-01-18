"use client";
import Card from "@/components/Card";
import CardLists from "@/components/CardLists";
import Section from "@/components/layout/Section";
import { useOfficeStore } from "@/store/officeStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useStore } from "zustand";

const CategorySection = ({ categoryName, categoryId }: { categoryName: string; categoryId: string }) => {
  const { office, regionId } = useStore(useOfficeStore);

  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      if (office.id) {
        const res = await fetch(`/api/products/${categoryId}`);
        const result = await res.json();
        console.log(result);
        const Product = result.filter((item: any) => {
          console.log(item);
          return item.stock.find((store: any) => {
            if (store["store_id"] === office.id) {
              console.log(store["store_id"]);
              return true;
            } else return false;
          });
        });
        return Product;
      } else {
        const res = await fetch(`/api/products/${categoryId}`);
        const result = await res.json();
        return result;
      }
    },
    queryKey: office.id ? ["products", categoryId] : ["products", categoryId, office.id]
  });

  console.log(data);
  useEffect(() => {
    refetch({});
  }, [office, refetch]);

  return (
    <Section title={`${categoryName}`} isCenter={true}>
      {!isLoading && data && <CardLists cardLists={data} />}
    </Section>
  );
};

export default CategorySection;
