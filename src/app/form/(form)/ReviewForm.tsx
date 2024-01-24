"use client";

import { ExtendReview, Review } from "@/types/db";
import React, { useEffect } from "react";
import FormFieldSet from "@/components/form/FormFieldSet";
import { useForm } from "react-hook-form";
import useStorage from "@/utils/useStorage";
import { useCustomMutation, useImageInput } from "@/hook";
import InputImage from "@/components/InputImage";
import { useAuthStore } from "@/store/authStore";
import { createUserReview, updateUserReview } from "@/service/table";

interface Props {
  reviewData: ExtendReview;
  productId: string;
  storeId: string;
}

interface UploadForm {
  title: string;
  content: string;
  url?: string[];
}

const ReviewForm = ({ reviewData, productId, storeId }: Props) => {
  const preReviewImageUrl = reviewData?.url;
  const { auth: userId } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<UploadForm>({ mode: "onChange" });
  const { uploadMultipleImages, deleteMultipleImage } = useStorage();
  const { customImageList, isEnter, handler, addPreImage } = useImageInput("multiple");

  const { mutate: createReviewMutate } = useCustomMutation({
    queryKey: ["review ", productId],
    mutationFn: async (formData) => await createUserReview({ userId, body: JSON.stringify(formData) })
  });

  const { mutate: updateReviewMutate } = useCustomMutation({
    queryKey: ["review ", productId],
    mutationFn: async (formData) =>
      await updateUserReview({ userId, reviewId: reviewData.id, body: JSON.stringify(formData) })
  });

  const handleFormSubmit = async (data: UploadForm) => {
    const storagePath = productId ? `${userId}/${productId}` : userId;
    const imageFileList = customImageList.map((n) => n.file) as File[];
    const imageFileIdList = customImageList.map((n) => n.id);

    try {
      const imageURLList = await uploadMultipleImages(imageFileList, "reivew", imageFileIdList, storagePath);
      const formData: Omit<Review, "id" | "created_at"> = {
        user_id: userId,
        title: data.title,
        product_id: productId,
        store_id: storeId,
        content: data.content,
        url: imageURLList
      };

      createReviewMutate(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateFormSubmit = async (data: UploadForm) => {
    const storagePath = productId ? `${userId}/${productId}` : userId;
    const preImageURLList = customImageList.filter((n) => n.file === null).map((n) => n.previewURL);
    const deletePreImageURLList =
      preReviewImageUrl &&
      preReviewImageUrl.filter((n) => {
        const isDelete = !preImageURLList.find((k) => k === n);
        return isDelete;
      });
    const newImageFileList = customImageList.filter((n) => n.file !== null).map((n) => n.file as File);
    const newImageFileIdList = customImageList.filter((n) => n.file !== null).map((n) => n.id);

    try {
      if (deletePreImageURLList) {
        await deleteMultipleImage("review", deletePreImageURLList);
      }
      let newImageURLList;
      if (newImageFileList.length > 0) {
        const res = await uploadMultipleImages(newImageFileList, "review", newImageFileIdList, storagePath);
        newImageURLList = res as string[];
      }

      const formData = {
        user_id: userId,
        title: data.title,
        content: data.content,
        url: newImageURLList ? [...preImageURLList, ...newImageURLList] : preImageURLList
      };

      updateReviewMutate(formData);
    } catch (error) {
      console.error(error);
    }
  };

  // 이미지가 있을 경우 이미지 불러오기 기능
  useEffect(() => {
    if (preReviewImageUrl) {
      addPreImage(preReviewImageUrl);
    }
  }, []);

  return (
    <form onSubmit={reviewData ? handleSubmit(handleUpdateFormSubmit) : handleSubmit(handleFormSubmit)}>
      <FormFieldSet title={"리뷰 제목"}>
        <input
          type="text"
          placeholder={"리뷰 제목을 입력해주세요."}
          className="p-[15px] w-full border-[1px] border-[#E5E5E5] "
          defaultValue={reviewData?.title}
          {...register("title")}
        />
      </FormFieldSet>
      <FormFieldSet title={"리뷰 내용"}>
        <textarea
          id="form__content"
          className="p-[15px] w-full min-h-[250px] border-[1px] border-line "
          placeholder={"리뷰 내용을 입력해주세요."}
          defaultValue={reviewData?.content}
          {...register("content", { required: true, maxLength: 500 })}
        />
      </FormFieldSet>
      <FormFieldSet title="사진첨부">
        <InputImage customImageList={customImageList} isEnter={isEnter} handler={handler} />
      </FormFieldSet>

      <div className="flex flex-row gap-[12px] mt-[60px]">
        <input
          type="submit"
          className="p-[16px] flex-grow text-[18px] cursor-pointer leading-none rounded-[5px] font-[600] text-[#FFFFFF] bg-[#3074F0] "
          value={reviewData ? "수정하기" : "등록하기"}
        />
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