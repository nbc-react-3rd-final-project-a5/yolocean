"use client";
import CustomButton from "@/components/CustomButton";
import Spinner from "@/components/Spinner";
import Article from "@/components/layout/Article";
import { useCustomMutation } from "@/hook";
import { getProduct, updateProduct } from "@/service/table";
import { Product, ProductProperties } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const UpdateProduct = ({ params }: { params: { productId: string } }) => {
  const productId = params.productId;
  const router = useRouter();
  const { data: product, isLoading } = useQuery<ProductProperties>({
    queryKey: ["product", productId],
    queryFn: () => getProduct({ productId })
  });
  const { mutate: updateProductMutate } = useCustomMutation({
    queryKey: ["product", productId],
    mutationFn: (data) => updateProduct({ body: data, productId })
  });
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<Product>({
    mode: "onChange"
  });

  const handleProductFormSubmit = (data: Product) => {
    if (window.confirm(`${JSON.stringify(data)} 변경하려는 정보가 맞습니까?`)) {
      updateProductMutate(JSON.stringify(data));
      router.push("/admin/product");
    } else {
      return;
    }
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="w-full">
      <Article title={"상품 수정하기"} isCenter={true}>
        <form
          onSubmit={handleSubmit(handleProductFormSubmit)}
          className="flex flex-col  min-w-[300px] justify-center itmes-center gap-10"
        >
          <div className="flex flex-col gap-5">
            <label htmlFor="name" className="flex flex-col gap-1">
              상품명
              <input
                placeholder={product?.name}
                className=" border-black border"
                id="name"
                type="text"
                {...register("name")}
              />{" "}
            </label>

            <label htmlFor="price" className="flex flex-col gap-1">
              가격
              <input
                placeholder={String(product?.price!)}
                className=" border-black border "
                id="price"
                type="text"
                {...register("price")}
              />
            </label>
            <label htmlFor="percentage_off" className="flex flex-col gap-1">
              할인률
              <input
                placeholder={`${product?.percentage_off!}%`}
                className=" border-black border"
                id="percentage_off"
                type="text"
                {...register("percentage_off")}
              />
            </label>
          </div>
          <div className="flex justify-end gap-2">
            <CustomButton type="submit" color="blue" size="sm">
              수정하기
            </CustomButton>
            <CustomButton type="button" color="white" size="sm" onClick={() => router.back()}>
              취소
            </CustomButton>
          </div>
        </form>
      </Article>
    </div>
  );
};

export default UpdateProduct;
