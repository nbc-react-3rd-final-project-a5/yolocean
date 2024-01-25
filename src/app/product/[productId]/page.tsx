import Image from "next/image";
import React from "react";
import Controller from "./ControlForm";
import Info from "./Info";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { getProduct } from "@/service/table";

interface Props {
  params: { productId: string };
  searchParams: { [key: string]: any } | undefined;
}

const ProductDetailPage = async ({ params: { productId }, searchParams }: Props) => {
  const product = await getProduct({ productId });
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
    percentage_off
  } = product;

  return (
    <section className="relative scroll-smooth">
      <PageBreadCrumb
        linkList={[
          { name: "홈", url: "/" },
          { name: category_name, url: `/category/${category_id}` },
          { name: name, url: `/category/${category_id}/${id}` }
        ]}
      />
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
          product_id={id}
          price={price}
          original_price={original_price}
          category_name={category_name}
          name={name}
        />
      </div>
      <Info productId={id} info_img={info_img} info={info} searchParams={searchParams?.article || "상품설명"} />
    </section>
  );
};

export default ProductDetailPage;
