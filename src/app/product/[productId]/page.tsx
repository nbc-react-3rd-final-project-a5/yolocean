import Image from "next/image";
import React from "react";
import Controller from "./ControlForm";
import Info from "./Info";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { getProduct } from "@/service/table";
import View from "./View";
import { Metadata, ResolvingMetadata } from "next";
import { revalidateTag } from "next/cache";

interface Props {
  params: { productId: string };
  searchParams: { [key: string]: any } | undefined;
}

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const productId = params.productId;
  revalidateTag("qna");
  revalidateTag("review");

  const product = await getProduct({ productId });

  return {
    title: `YOLOEAN | ${product.category.category_name} | ${product.name} `,
    description: `${product.name}의 상세페이지 입니다.`,
    openGraph: {
      images: ["/opengraph-image.png", product.thumbnail]
    }
  };
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
      <View product={product} />
      <PageBreadCrumb
        linkList={[
          { name: "홈", url: "/" },
          { name: category_name, url: `/category/${category_id}` },
          { name: name, url: `/category/${category_id}/${id}` }
        ]}
      />
      <div className="flex gap-[24px] flex-wrap  ">
        <div className="relative max-w-[500px] w-full h-[500px] min-w-[300px] mx-auto mobile:h-[300px]   ">
          <Image
            priority
            alt={`${name}_image`}
            style={{ objectFit: "fill" }}
            fill
            width={0}
            height={0}
            sizes="(max-width: 1200px) 335px, 500px"
            src={thumbnail}
          />
        </div>
        <Controller
          view={view}
          percentage_off={percentage_off}
          product_id={id}
          price={price}
          original_price={original_price}
          category_name={category_name}
          name={name}
        />
      </div>
      <Info
        productId={id}
        info_img={info_img}
        info={info}
        article={searchParams?.article || "상품설명"}
        searchParams={searchParams}
      />
    </section>
  );
};

export default ProductDetailPage;
