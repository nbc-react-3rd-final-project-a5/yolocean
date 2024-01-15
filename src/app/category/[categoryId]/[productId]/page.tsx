"use client";
import { useProduct } from "@/hooks";
import { ProductProperties } from "@/types/db";
import Image from "next/image";
import React from "react";
import Controller from "./ControlForm";
import Info from "./Info";
interface Props {
  params: { productId: string };
}

const ProductDetailPage = ({ params: { productId } }: Props) => {
  const { product, isLoading } = useProduct(productId);

  if (isLoading && product === undefined) {
    return <>로딩</>;
  }

  const {
    name,
    category: { category_name },
    thumbnail,
    price,
    info_img,
    info,
    original_price,
    view,
    stock: { count, store }
  } = product as ProductProperties;

  return (
    <section>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex gap-[24px]">
          <div className="relative w-[350px] h-[350px]">
            <Image alt={`${name}_image`} style={{ objectFit: "fill" }} fill src={thumbnail} />
          </div>

          <Controller price={price} category_name={category_name} name={name} />
        </div>
        <Info info_img={info_img} info={info} />

        <article></article>
      </div>
    </section>
  );
};

export default ProductDetailPage;
