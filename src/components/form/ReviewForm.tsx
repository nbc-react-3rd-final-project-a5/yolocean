"use client";

import React from "react";
import { useForm } from "react-hook-form";
import InputImage from "../InputImage";
import { TablesInsert } from "@/types/supabase";
import { useImageInput } from "@/hooks";
import useStorage from "@/utils/useStorage";

interface Props {
  bucket: string;
  userId: string;
  productId: string;
  isReview: boolean;
}

interface uploadForm {
  title: string;
  content: string;
  url?: string[];
}

const FormFieldSet = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <fieldset className="block mt-[40px]">
      <legend className="block w-full  text-[20px] font-[600] leading-[0.6px] ">
        <div className="mb-[20px]">{title}</div>
      </legend>
      {children}
    </fieldset>
  );
};

const ReviewForm = ({ bucket, userId, productId, isReview }: Props) => {
  const { uploadMultipleImages } = useStorage();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<uploadForm>({ mode: "onChange" });
  const { customImageList, isEnter, handler } = useImageInput();

  const handleFormSubmit = async (data: uploadForm) => {
    const storagePath = productId ? `${userId}/${productId}` : userId;
    const imageFileList = customImageList.map((n) => n.file);
    const imageFileIdList = customImageList.map((n) => n.id);

    try {
      const imageURLList = await uploadMultipleImages(imageFileList, bucket, imageFileIdList, storagePath);
      const formData: TablesInsert<"review"> = {
        user_id: userId,
        title: data.title,
        product_id: productId,
        content: data.content,
        url: imageURLList
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

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormFieldSet title="한줄요약">
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="p-[15px] w-full border-[1px] border-[#E5E5E5] leading-4"
          {...register("title")}
        />
      </FormFieldSet>
      <FormFieldSet title="문의내용">
        <textarea
          id="form__content"
          className="p-[15px] w-full min-h-[250px] border-[1px] border-[#E5E5E5]"
          placeholder="문의내용을 입력해주세요."
          {...register("content", { required: true, maxLength: 500 })}
        />
      </FormFieldSet>
      <FormFieldSet title="사진첨부">
        <InputImage customImageList={customImageList} isEnter={isEnter} handler={handler} />
      </FormFieldSet>

      <div className="flex flex-row gap-[12px] mt-[60px]">
        <input
          type="submit"
          className="p-[16px] flex-grow text-[18px] leading-none rounded-[5px] font-[600] text-[#FFFFFF] bg-[#3074F0] "
          value={"등록하기"}
        />
        <input
          type="button"
          className="p-[16px] flex-grow text-[18px] leading-none rounded-[5px] font-[600] text-[#FFFFFF] bg-[#999999]"
          value={"취소"}
        />
      </div>
    </form>
  );
};

export default ReviewForm;
