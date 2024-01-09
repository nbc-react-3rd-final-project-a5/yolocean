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
  const [formFields, setFormFields] = useState([{ name: "", value: "" }]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<ProductForm>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      price: 0,
      thumbnail: "",
      original_price: 0,
      view: 0,
      info_img: ""
    }
  });
  let array: string[] = [];

  const handleAddFields = () => {
    const values = [...formFields, { name: "", value: "" }];
    setFormFields(values);
  };

  const handleRemoveFields = (index: number) => {
    if (formFields.length === 1) {
      alert("At least one form must remain");
      return;
    }
    const values = [...formFields].splice(index, 1);
    setFormFields(values);
  };

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const values = [...formFields];

    if (e.target.name === "name") {
      values[index].name = e.target.value;
    } else {
      values[index].value = e.target.value;
    }
    setFormFields(values);
  };

  formFields.forEach((data) => {
    array.push(`${data.name}&${data.value}`);
  });

  const handleProductFormSubmit = (data: ProductForm) => {
    alert(JSON.stringify(data));
    createData(data);
  };

  const createData = async (data: ProductForm) => {
    fetch(`${window.location.origin}/api/product`, { method: "POST", body: JSON.stringify(data) });
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
        <option>카테고리 선택</option>

        {category?.map((data) => {
          return (
            <option key={data.id} value={data.id}>
              {data.category_name}
            </option>
          );
        })}
      </select>
      <>
        {formFields.map((field, index) => (
          <div key={index} style={{ marginBottom: 5 }}>
            <input
              type="text"
              placeholder="Field name"
              name="name"
              value={field.name}
              onChange={(e) => handleInputChange(index, e)}
              style={{ marginRight: 10 }}
            />

            <input
              type="text"
              placeholder="Field value"
              name="value"
              value={field.value}
              onChange={(e) => handleInputChange(index, e)}
              style={{ marginRight: 10 }}
            />

            <button type="button" onClick={() => handleRemoveFields(index)}>
              삭제
            </button>
          </div>
        ))}

        <button type="button" onClick={() => handleAddFields()} style={{ marginTop: 10, marginRight: 10 }}>
          추가
        </button>
      </>
      <input {...register("info")} />
      <button type="submit" onClick={() => setValue("info", array)}>
        확인
      </button>
    </form>
  );
};

export default ProductForm;
