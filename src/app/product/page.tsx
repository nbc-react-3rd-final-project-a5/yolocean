"use client";
import { Product } from "@/types/db";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

type ProductForm = Omit<Product, "id" | "view">;

const ProductForm = () => {
  const defaultValues = {
    name: "",
    price: 0,
    thumbnail: "",
    info: "",
    original_price: 0,
    info_img: "",
    category_id: ""
  };

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ProductForm>({
    mode: "onSubmit",
    defaultValues: defaultValues
  });

  const handleProductFormSubmit = (data: ProductForm) => {
    alert(data);
  };

  return (
    <form
      className="w-[300px] flex flex-col justify-center align-center"
      onSubmit={handleSubmit(handleProductFormSubmit)}
    >
      <input className=" border-black border-solid border" id="name" type="text" {...register("name")} />
      <input className=" border-black border-solid border" id="price" type="text" {...register("price")} />
      <input className=" border-black border-solid border" id="thumbnail" type="text" {...register("thumbnail")} />
      <input className=" border-black border-solid border" id="info" type="text" {...register("info")} />
      <input
        className=" border-black border-solid border"
        id="original_price"
        type="text"
        {...register("original_price")}
      />
      <input className=" border-black border-solid border" id="info_img" type="text" {...register("info_img")} />
      <input className=" border-black border-solid border" id="category_id" type="text" {...register("category_id")} />
      <button type="submit">제출</button>
    </form>
  );
};

export default ProductForm;
