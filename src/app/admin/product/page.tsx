"use client";

import CustomButton from "@/components/CustomButton";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";
import { useCustomMutation } from "@/hook";
import { deleteProduct, getAllProduct, getProductByPage } from "@/service/table";
import { Product, ProductProperties } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  searchParams?: { [key: string]: number | undefined };
}

const AdminProductPage = ({ searchParams }: Props) => {
  const page = searchParams?.page;

  const { data: products, isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProductByPage({ page })
  });

  // const { mutate: updateProductMutation } = useCustomMutation({
  //   mutationFn: async () => await updateCart(),
  //   queryKey: ["products"]
  // });
  const { mutate: deleteProductMutation } = useCustomMutation({
    mutationFn: async (productId) => await deleteProduct(productId),
    queryKey: ["products"]
  });

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="w-[700px]">
      <div className="flex justify-between items-center w-full h-[60px]">
        <p>전체 상품</p>
        <Link href={"/admin/product/addProduct"}>상품 추가하기</Link>
      </div>
      <div className="flex flex-col gap-2">
        {products!.products!.map((product: Product) => (
          <div key={product.id} className="border border-line flex p-2 items-center justify-evenly h-[150px]">
            <figure className="">
              <Image
                src={product.thumbnail}
                width={100}
                height={100}
                alt={`${product?.name} 사진`}
                blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBAB  bWyZJf74GZgAAAABJRU5ErkJggg=="
                placeholder="blur"
              />
            </figure>
            <div className="flex flex-col justify-between">
              <div className="w-[330px]">
                <p className="truncate font-medium text-tc-light text-end text-lg">{product.name}</p>
                <p className="text-end text-lg">{product.price}원</p>
                <p className="text-end text-lg">{product.percentage_off}%</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <CustomButton color="white" onClick={() => {}} size="sm" className="h-[50px]">
                수정하기
              </CustomButton>
              <CustomButton
                color="white"
                onClick={() => {
                  if (window.confirm("상품을 삭제하시겠습니까?")) {
                    deleteProductMutation({ productId: product.id });
                    alert("상품이 삭제되었습니다.");
                  } else return;
                }}
                size="sm"
                className="h-[50px]"
              >
                삭제하기
              </CustomButton>
            </div>
          </div>
        ))}
      </div>
      <Pagination articleName={"상품"} maxPage={products.maxPage} currentPage={page!} limit={5} />
    </div>
  );
};

export default AdminProductPage;
