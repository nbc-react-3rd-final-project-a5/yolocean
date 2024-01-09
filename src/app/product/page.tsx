"use client";
import CreateModal from "@/components/portal/CreateModal";
import useProduct from "@/hooks/useProduct";
import KakaoMap from "@/lib/KakaoMap";
import { useModalStore } from "@/store/modalStore";
import { ProductProperties } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductPage = () => {
  const { product, isLoading } = useProduct();
  const { isModalOpen, openModal } = useModalStore();

  return (
    <div className="grid grid-cols-4 gap-4">
      {!isLoading &&
        (product as ProductProperties[]).map((product) => <ProductCard product={product} key={product.id} />)}
      {isModalOpen && <CreateModal />}
      <button
        onClick={() => {
          openModal(<KakaoMap />);
        }}
      >
        모달오픈!
      </button>
    </div>
  );
};

export default ProductPage;

interface IProps {
  product: ProductProperties;
}

function ProductCard({ product: { id, price, category, thumbnail, name } }: IProps) {
  return (
    <Link href={`/product/${id}`} className="flex-1">
      <div className=" bg-white text-black rounded-md overflow-hidden">
        <div className="w-full h-[150px] relative">
          <Image priority sizes="100%" src={thumbnail} alt="productThumbnail" layout="fill" />
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
