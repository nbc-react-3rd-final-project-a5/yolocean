"use client";
import { supabase } from "@/service/supabase";
import { Product } from "@/types/db";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type ProductForm = Omit<Product, "id">;

const ProductForm = () => {
  const [category, setCategory] = useState<
    | {
        category_name: string;
        id: string;
      }[]
    | null
  >();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ProductForm>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      price: 0,
      thumbnail: "",
      original_price: 0,
      view: 0,
      info_img: ""
      // category_id: ""
    }
  });

  const addInput = () => {
    return (
      <div>
        <label>상세 정보 key 값</label>
        <input />
        <label>상세 정보 value 값</label>
        <input />
      </div>
    );
  };

  const handleProductFormSubmit = (data: ProductForm) => {
    alert(JSON.stringify(data));
    insertProductData(data);
  };

  const insertProductData = async (data: ProductForm) => {
    try {
      await supabase.from("product").insert(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const { data } = await supabase.from("category").select();
      setCategory(data);
      console.log(data);
    } catch (error) {
      console.log("category fetching error", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <form
      className="w-[300px] flex flex-col justify-center align-center"
      onSubmit={handleSubmit(handleProductFormSubmit)}
    >
      <input
        className=" border-black border-solid border"
        id="name"
        type="text"
        {...register("name", {
          required: "해당 필드는 필수입니다."
        })}
      />
      <input className=" border-black border-solid border" id="price" type="text" {...register("price")} />
      <input className=" border-black border-solid border" id="thumbnail" type="text" {...register("thumbnail")} />
      <input
        className=" border-black border-solid border"
        id="original_price"
        type="text"
        {...register("original_price")}
      />
      <input className=" border-black border-solid border" id="info_img" type="text" {...register("info_img")} />
      <select {...register("category_id")}>
        {category?.map((data) => {
          return (
            <option key={data.id} value={data.id}>
              {data.category_name}
            </option>
          );
        })}
      </select>
      <div>
        <p>상세 정보 입력</p>
        <label>상세 정보 key 값</label>
        <input />
        <label>상세 정보 value 값</label>
        <input />
        <button type="button" onClick={addInput}>
          +
        </button>
      </div>
      <button type="submit">제출</button>
    </form>
  );
};

export default ProductForm;
