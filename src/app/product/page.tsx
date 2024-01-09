"use client";
import useProduct from "@/hooks/useProduct";
import { ProductWithCategory } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductPage = () => {
  const { product, isLoading } = useProduct();

  return (
    <div className="flex gap-1">
      {!isLoading && product!.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
  );
};

export default ProductPage;

interface IProps {
  product: ProductWithCategory;
}

function ProductCard({ product: { id, price, category, thumbnail, name } }: IProps) {
  return (
    <Link href={`/product/${id}`} className="flex-1">
      <div className=" bg-white text-black rounded-md overflow-hidden">
        <div className="w-full h-[150px] relative">
          <Image src={thumbnail} alt="productThumbnail" layout="fill" objectFit="fill" />
        </div>
        <div className="px-1 py-2">
          <span className="text-xs text-neutral-600">{category.category_name}</span>

          <div className="flex justify-between text-sm font-medium">
            <h1>{name}</h1>
            <span>{price.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
