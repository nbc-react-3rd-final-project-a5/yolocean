"use client";
import useProduct from "@/hooks/useProduct";
import { ProductWithCategory } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductPage = () => {
  const { product, isLoading } = useProduct();

  return (
    <div className="flex">
      {!isLoading && (product as any[]).map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
};

export default ProductPage;

interface IProps {
  product: ProductWithCategory;
}

function ProductCard({ product: { id, category, thumbnail, name } }: IProps) {
  return (
    <Link href={`/product/${id}`}>
      <div className="w-[200px] h-[150px] relative">
        <Image src={thumbnail} alt="productThumbnail" layout="fill" objectFit="fill" />
      </div>
      <span>{category.category_name}</span>
      <h1>{name}</h1>
    </Link>
  );
}
