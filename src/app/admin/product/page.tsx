"use client";
import useImageFile from "@/hooks/useImageFile";
import { Product } from "@/types/db";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const ProductForm = () => {
  const [category, setCategory] = useState<
    | {
        category_name: string;
        id: string;
      }[]
    | null
  >();
  const [formFields, setFormFields] = useState([{ name: "", value: "" }]);

  const [thumbnailImage, setThumbnailImage] = useState<File>();
  const [detailInfoImage, setDetailInfoImage] = useState<File>();

  const { uploadImage } = useImageFile();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<Product>({
    mode: "onSubmit",
    defaultValues: {
      id: "",
      name: "",
      price: 0,
      thumbnail: "",
      original_price: 0,
      view: 0,
      info_img: ""
    }
  });

  let formFieldsArray: string[] = [];

  const handleAddFields = () => {
    const values = [...formFields, { name: "", value: "" }];
    setFormFields(values);
  };

  const handleRemoveFields = (index: number) => {
    if (formFields.length === 1) {
      alert("삭제하실 수 없습니다!");
      return;
    }
    const values = [...formFields].filter((item, i) => {
      return i !== index;
    });
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
    formFieldsArray.push(`${data.name}&${data.value}`);
  });

  const handleProductFormSubmit = async (data: Product) => {
    const id = uuidv4();
    const thumbnailRes = await uploadImage(thumbnailImage!, "product", "thumbnail", id);
    const infoImgRes = await uploadImage(detailInfoImage!, "product", "detail", id);
    const thumbnailUrl = await thumbnailRes.json();
    const infoImgUrl = await infoImgRes.json();
    data.id = id;
    data.thumbnail = thumbnailUrl;
    data.info_img = infoImgUrl;
    console.log("data", data);
    insertProductData(data);
  };

  const insertProductData = async (data: Product) => {
    await fetch("/api/product", { method: "POST", body: JSON.stringify(data) });
  };

  const fetchCategoryData = async () => {
    const res = await fetch("/api/category", {
      method: "GET"
    });
    const category = await res.json();
    setCategory(category);
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <form
      className="w-[300px] flex flex-col justify-center align-center"
      onSubmit={handleSubmit(handleProductFormSubmit)}
    >
      <label htmlFor="name">상품명</label>
      <input
        className=" border-black border-solid border"
        id="name"
        type="text"
        {...register("name", {
          required: "상품명을 입력해주세요."
        })}
      />
      {errors?.name ? <p>{errors.name.message}</p> : null}
      <label htmlFor="price">렌트 가격</label>
      <input
        className=" border-black border-solid border"
        id="price"
        type="text"
        {...register("price", {
          required: "렌트 가격을 설정해주세요."
        })}
      />
      {errors?.price ? <p>{errors.price.message}</p> : null}
      <label htmlFor="original_price">원가</label>
      <input
        className=" border-black border-solid border"
        id="original_price"
        type="text"
        {...register("original_price", {
          required: "원가를 설정해주세요."
        })}
      />
      {errors?.original_price ? <p>{errors.original_price.message}</p> : null}

      <label htmlFor="thumbnail">상품 사진</label>
      <input
        className=" border-black border-solid border"
        id="thumbnail"
        type="file"
        accept="image/*"
        {...register("thumbnail", {
          required: "상품 대표 사진을 등록해주세요."
        })}
        onChange={(e) => {
          if (!!e.target.files) {
            setThumbnailImage(e.target.files[0]);
          } else {
            alert("이미지 파일을 확인해주세요!");
          }
        }}
      />
      {errors?.thumbnail ? <p>{errors.thumbnail.message}</p> : null}

      <label htmlFor="info_img">상품 상세 설명 이미지</label>
      <input
        className=" border-black border-solid border"
        id="info_img"
        type="file"
        accept="image/*"
        {...register("info_img")}
        onChange={(e) => {
          if (!!e.target.files) {
            setDetailInfoImage(e.target.files[0]);
          } else {
            alert("이미지 파일을 확인해주세요!");
          }
        }}
      />

      <select
        {...register("category_id", {
          required: "카테고리를 선택해주세요."
        })}
      >
        <option>카테고리 선택</option>
        {category?.map((data) => {
          return (
            <option key={data.id} value={data.id}>
              {data.category_name}
            </option>
          );
        })}
      </select>
      <p>{errors?.category_id ? <p>{errors.category_id.message}</p> : null}</p>
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
      <button
        type="submit"
        onClick={() => {
          setValue("info", formFieldsArray);
        }}
      >
        확인
      </button>
    </form>
  );
};

export default ProductForm;
