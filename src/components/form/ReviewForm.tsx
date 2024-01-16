"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import InputImage from "../InputImage";
import { TablesInsert } from "@/types/supabase";
import { useImageInput, useReview } from "@/hooks";
import useStorage from "@/utils/useStorage";

interface Props {
  formType: "review" | "qna";
  userId: string;
  productId: string;
  storeId: string;
  /**
   * targetId = reviewId | qnaId
   */
  targetId?: string;
}

interface UploadForm {
  title: string;
  content: string;
  url?: string[];
}

enum EnumFormType {
  review = "리뷰",
  qna = "문의"
}

// Form FieldSet 컴포넌트
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

// Form 컴포넌트
const ReviewForm = ({ formType, userId, productId, storeId, targetId }: Props) => {
  const { reviewData, isError, isLoading, updateReviewMutation } = useReview({
    userId,
    reviewId: targetId
  });
  const preReviewData = reviewData ? reviewData[0] : null;
  const { uploadMultipleImages, deleteMultipleImage } = useStorage();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<UploadForm>({ mode: "onChange" });
  const { customImageList, isEnter, handler, addPreImage } = useImageInput();

  useEffect(() => {
    if (targetId && preReviewData?.url) {
      addPreImage(preReviewData.url);
    }
  }, [targetId, isLoading]);

  const handleFormSubmit = async (data: UploadForm) => {
    const storagePath = productId ? `${userId}/${productId}` : userId;
    const imageFileList = customImageList.map((n) => n.file) as File[];
    const imageFileIdList = customImageList.map((n) => n.id);

    try {
      const imageURLList = await uploadMultipleImages(imageFileList, formType, imageFileIdList, storagePath);
      const formData: TablesInsert<"review"> = {
        user_id: userId,
        title: data.title,
        product_id: productId,
        store_id: storeId,
        content: data.content,
        url: imageURLList
      };
      const res = await fetch(`${window.location.origin}/api/review/users/${userId}`, {
        method: "POST",
        body: JSON.stringify(formData)
      });
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateFormSubmit = async (data: UploadForm) => {
    const storagePath = productId ? `${userId}/${productId}` : userId;
    const preImageURLList = customImageList.filter((n) => n.file === null).map((n) => n.previewURL);
    const deletePreImageURLList =
      preReviewData?.url &&
      preReviewData.url.filter((n) => {
        const isDelete = !preImageURLList.find((k) => k === n);
        return isDelete;
      });
    const newImageFileList = customImageList.filter((n) => n.file !== null).map((n) => n.file as File);
    const newImageFileIdList = customImageList.filter((n) => n.file !== null).map((n) => n.id);

    try {
      if (deletePreImageURLList) {
        await deleteMultipleImage(formType, deletePreImageURLList);
      }
      let newImageURLList;
      if (newImageFileList.length > 0) {
        const res = await uploadMultipleImages(newImageFileList, formType, newImageFileIdList, storagePath);
        newImageURLList = res as string[];
      }

      const formData = {
        user_id: userId,
        title: data.title,
        content: data.content,
        url: newImageURLList ? [...preImageURLList, ...newImageURLList] : preImageURLList
      };

      updateReviewMutation.mutate(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={targetId ? handleSubmit(handleUpdateFormSubmit) : handleSubmit(handleFormSubmit)}>
      <FormFieldSet title={`${EnumFormType[formType]}제목`}>
        <input
          type="text"
          placeholder={`${EnumFormType[formType]}제목을 입력해주세요.`}
          className="p-[15px] w-full border-[1px] border-[#E5E5E5] "
          defaultValue={targetId && !!reviewData ? reviewData[0].title : undefined}
          {...register("title")}
        />
      </FormFieldSet>
      <FormFieldSet title={`${EnumFormType[formType]}내용`}>
        <textarea
          id="form__content"
          className="p-[15px] w-full min-h-[250px] border-[1px] border-line "
          placeholder={`${EnumFormType[formType]}내용을 입력해주세요.`}
          defaultValue={targetId && !!reviewData ? reviewData[0].content : undefined}
          {...register("content", { required: true, maxLength: 500 })}
        />
      </FormFieldSet>
      <FormFieldSet title="사진첨부">
        <InputImage customImageList={customImageList} isEnter={isEnter} handler={handler} />
      </FormFieldSet>

      <div className="flex flex-row gap-[12px] mt-[60px]">
        {targetId ? (
          <input
            type="submit"
            className="p-[16px] flex-grow text-[18px] cursor-pointer leading-none rounded-[5px] font-[600] text-[#FFFFFF] bg-[#3074F0] "
            value={"수정하기"}
          />
        ) : (
          <input
            type="submit"
            className="p-[16px] flex-grow text-[18px] cursor-pointer leading-none rounded-[5px] font-[600] text-[#FFFFFF] bg-[#3074F0] "
            value={"등록하기"}
          />
        )}

        <input
          type="button"
          className="p-[16px] flex-grow text-[18px] cursor-pointer leading-none rounded-[5px] font-[600] text-[#FFFFFF] bg-[#999999]"
          value={"취소"}
        />
      </div>
    </form>
  );
};

export default ReviewForm;
