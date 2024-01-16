"use client";
import { useProduct } from "@/hooks";
import { ProductProperties } from "@/types/db";
import Image from "next/image";
import React from "react";
import Controller from "./ControlForm";
import Info from "./Info";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
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
    category_id,
    category: { category_name },
    thumbnail,
    price,
    id,
    info_img,
    info,
    original_price,
    view,
    percentage_off,
    stock: { count, store }
  } = product as ProductProperties;

  return (
    <section>
      <PageBreadCrumb
        linkList={[
          { name: "홈", url: "/" },
          { name: category_name, url: `/category/${category_id}` },
          { name: name, url: `/category/${category_id}/${id}` }
        ]}
      />
      {/*  */}
      <div className="flex gap-[24px]">
        <div className="relative w-[500px] h-[500px]">
          <Image
            priority
            alt={`${name}_image`}
            style={{ objectFit: "fill" }}
            fill
            sizes="(max-width: 1200px) 500px"
            src={thumbnail}
          />
        </div>
        <Controller
          percentage_off={percentage_off}
          id={id}
          price={price}
          original_price={original_price}
          category_name={category_name}
          name={name}
        />
      </div>
      {/*  */}
      <Info info_img={info_img} info={info} />
    </section>
  );
};

export default ProductDetailPage;
