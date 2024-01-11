"use client";

import React, { useRef } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import DragAndDropImageBox from "../DragDropImageInput";
import { v4 as uuidv4 } from "uuid";
import Input from "../Input";
import useImageFile from "@/hooks/useImageFile";
import { TablesInsert } from "@/types/supabase";

interface Props {
  bucket: string;
  userId: string;
  productId: string;
  isReview: boolean;
}

interface FormData {
  title: string;
  content: string;
  images: FileList;
}

const formSetting = {
  maxImageCount: 4,
  maxImageSize: 10
};

const ReviewForm = ({ bucket, userId, productId, isReview }: Props) => {
  const { uploadImage } = useImageFile();
  const methods = useForm<FormData>({ mode: "onChange" });
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = methods;

  const handleFormSubmit = async (data: FormData) => {
    const image = Array.from(data.images)[0];
    const imageId = uuidv4();
    const path = productId ? `${userId}/${productId}` : userId;

    try {
      const imageURL = await uploadImage(image, bucket, imageId, path);
      const formData: TablesInsert<"review"> = {
        user_id: userId,
        title: data.title,
        product_id: productId,
        content: data.content,
        url: JSON.stringify([imageURL])
      };
      const res = await fetch(`api/review/${userId}`, {
        method: "POST",
        body: JSON.stringify(formData)
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const titleLength = watch("title") ? watch("title").length : 0;
  const contentLength = watch("content") ? watch("content").length : 0;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="bg-gray-300 border-2 border-gray-500 p-2">
          <Input
            label="제목"
            name="title"
            placeholder="리뷰 제목을 입력하세요."
            required="필수 입력사항입니다."
            errorMessage="입력값을 확인하세요"
            type="text"
            register={register}
            formStateErrors={errors}
            setError={setError}
            clearErrors={clearErrors}
            watch={watch}
            max={10}
          />
        </div>
        <div className="bg-gray-300 border-2 border-gray-500 p-2">
          <label htmlFor="form__content">{isReview ? "문의내용" : "상세리뷰"}</label>
          <textarea
            id="form__content"
            className="w-full"
            placeholder={isReview ? "문의내용을 적어주세요." : "상세리뷰를 적어주세요"}
            {...register("content", { required: true, maxLength: 500 })}
          />
        </div>
        {/* <div className="bg-gray-300 border-2 border-gray-500 p-2">
          <label htmlFor="form__images">사진첨부</label>
          <input type="file" {...register("images")} id="form__images" accept="image/*" />
        </div> */}

        {/* TODO : 드래그 앤 드랍 기능을 reack hook form에 맞게 수정하기 */}
        <div className="bg-gray-300 border-2 border-gray-500 p-2">
          <label>
            사진첨부 <span>최대 {formSetting.maxImageCount}장</span>
          </label>
          <DragAndDropImageBox />
        </div>
        <input type="submit" className="bg-gray-300 border-2 border-gray-500 p-2" />
      </form>
    </FormProvider>
  );
};

export default ReviewForm;
