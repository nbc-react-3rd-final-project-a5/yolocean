"use client";
import ContextInput from "@/components/ContextInput";
import Input from "@/components/Input";
import useCategory from "@/hooks/useCategory";
import useImageFile from "@/hooks/useImageFile";
import { Product } from "@/types/db";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const ProductForm = () => {
  const [formFields, setFormFields] = useState([{ name: "", value: "" }]);

  const [thumbnailImage, setThumbnailImage] = useState<File>();
  const [detailInfoImage, setDetailInfoImage] = useState<File>();
  const [rangeValue, setRangeValue] = useState<string>("할인없음");

  const { uploadImage } = useImageFile();
  const { category } = useCategory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm<Product>({
    mode: "onChange",
    defaultValues: {
      id: "",
      name: "",
      price: 0,
      thumbnail: "",
      original_price: 0,
      view: 0,
      info_img: "",
      percentage_off: 0
    }
  });

  const userRangeInput = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    setRangeValue(e.currentTarget.value);
  };

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
    const thumbnailUrl = await uploadImage(thumbnailImage!, "product", "thumbnail", id);
    const infoImgUrl = await uploadImage(detailInfoImage!, "product", "detail", id);
    data.id = id;
    data.thumbnail = thumbnailUrl;
    data.info_img = infoImgUrl;
    console.log("data", data);
    if (data.info && data.name && data.category_id && data.price && data.thumbnail && data.id && data.original_price) {
      insertProductData(data);
      alert("상품이 등록 되었습니다!");
    } else {
      alert("필수 항목을 모두 입력해주세요!");
      return;
    }
  };

  const insertProductData = async (data: Product) => {
    await fetch("/api/product", { method: "POST", body: JSON.stringify(data) });
  };

  return (
    <div className="mx-auto container max-w-[1200px] w-[90%] my-5 flex flex-col justify-center gap-1">
      <p className="text-2xl font-bold">상품등록 페이지</p>
      <form className="w-[300px] flex flex-col justify-center gap-1" onSubmit={handleSubmit(handleProductFormSubmit)}>
        <label htmlFor="name">상품명 *</label>
        <input
          className=" border-black border"
          id="name"
          type="text"
          {...register("name", {
            required: "상품명을 입력해주세요."
          })}
        />
        {errors?.name ? <p className=" text-red-500">{errors.name.message}</p> : null}
        <label htmlFor="price">렌트 가격 *</label>
        <input
          className=" border-black border"
          id="price"
          type="text"
          {...register("price", {
            required: "렌트 가격을 설정해주세요."
          })}
        />

        <label htmlFor="percentage_off">할인률 0~100% *</label>
        <input
          id="percentage_off"
          type="range"
          min="0"
          max="100"
          step="10"
          {...register("percentage_off")}
          onClick={userRangeInput}
        />
        {rangeValue === "0" ? <p>할인없음</p> : <p>{rangeValue}</p>}

        {errors?.price ? <p className=" text-red-500">{errors.price.message}</p> : null}
        <label htmlFor="original_price">원가 *</label>
        <input
          className=" border-black border"
          id="original_price"
          type="text"
          {...register("original_price", {
            required: "원가를 설정해주세요."
          })}
        />
        {errors?.original_price ? <p className=" text-red-500">{errors.original_price.message}</p> : null}

        <label htmlFor="thumbnail">상품 사진 *</label>
        <input
          className=" border-black border"
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
        {errors?.thumbnail ? <p className=" text-red-500">{errors.thumbnail.message}</p> : null}

        <label htmlFor="info_img">상품 상세 설명 이미지</label>
        <input
          className=" border-black border"
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
          className="my-1 border border-black"
          {...register("category_id", {
            required: "카테고리를 선택해주세요."
          })}
        >
          <option>카테고리 선택 *</option>
          {errors?.category_id ? <p className=" text-red-500">{errors.category_id.message}</p> : null}

          {category?.map((data) => {
            return (
              <option key={data.id} value={data.id}>
                {data.category_name}
              </option>
            );
          })}
        </select>
        <>
          <p>제품 추가 상세 정보 기입</p>
          {formFields.map((field, index) => (
            <div key={index}>
              <div className=" flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="예: 제품명"
                  name="name"
                  value={field.name}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border-black border w-[200px]"
                />

                <input
                  type="text"
                  placeholder="예: OO튜브"
                  name="value"
                  value={field.value}
                  onChange={(e) => handleInputChange(index, e)}
                  className="border-black border w-[200px]"
                />
              </div>
              <button
                type="button"
                className=" bg-slate-300 border border-black w-[100px] mt-1"
                onClick={() => handleRemoveFields(index)}
              >
                항목 삭제
              </button>
            </div>
          ))}
          <div className=" top-[420px] left-[220px]">
            <button
              type="button"
              className=" bg-slate-300 border border-black w-[100px]"
              onClick={() => handleAddFields()}
            >
              항목 추가하기
            </button>
          </div>
        </>
        <input className="hidden" {...register("info")} />
        <button
          type="submit"
          className="bg-slate-300 border border-black w-[100px] mt-5"
          onClick={() => {
            setValue("info", formFieldsArray);
          }}
        >
          상품 등록하기
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
