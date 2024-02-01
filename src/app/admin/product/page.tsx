"use client";

import Spinner from "@/components/Spinner";
import { getAllProduct } from "@/service/table";
import { ProductProperties } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const page = () => {
  const { data: products, isLoading } = useQuery<ProductProperties[]>({
    queryKey: ["products"],
    queryFn: getAllProduct
  });
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <p>전체 상품</p>
        <Link href={"/admin/product/addProduct"}>상품 추가하기</Link>
      </div>
      {products!.map((product) => (
        <div key={product.id} className="border border-line ">
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
};

export default page;
