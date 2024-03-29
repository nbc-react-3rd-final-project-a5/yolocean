"use client";
import CustomButton from "@/components/CustomButton";
import InputImage from "@/components/InputImage";
import FormFieldSet from "@/components/form/FormFieldSet";
import { useImageInput } from "@/hook";
import { createUserQna, updateUserQna } from "@/service/table";
import { useAuthStore } from "@/store/authStore";
import { ExtendQna, Qna } from "@/types/db";
import useStorage from "@/utils/useStorage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";

const Spinner = dynamic(() => import("@/components/Spinner"));

interface Props {
  qnaData: ExtendQna;
  productId: string;
}

const QnaForm = ({ qnaData, productId }: Props) => {
  const preReviewImageUrl = qnaData?.url;
  const { auth: userId } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" });
  //   ========== Image Upload ============
  const { uploadMultipleImages, deleteMultipleImage } = useStorage();
  const { customImageList, isEnter, handler, addPreImage } = useImageInput(4);

  // 이미지가 있을 경우 이미지 불러오기 기능
  useEffect(() => {
    if (preReviewImageUrl) {
      addPreImage(preReviewImageUrl);
    }
  }, []);

  //   ========== Submit ============

  const handleCreateFormSubmit = async (data: any) => {
    if (loading) return;
    setLoading(true);
    // Image
    const imageFileList = customImageList.map((n) => n.file) as File[];
    const imageFileIdList = customImageList.map((n) => n.id);
    const storagePath = productId ? `${userId}/${productId}` : userId;

    try {
      const imageURLList = await uploadMultipleImages(imageFileList, "qna", imageFileIdList, storagePath);
      const formData: Omit<Qna, "id" | "answer" | "created_at"> = {
        user_id: userId,
        title: data.title,
        product_id: productId,
        content: data.content,
        url: imageURLList
      };

      await createUserQna({ userId, body: JSON.stringify(formData) });
      setLoading(false);
      return productId
        ? router.push(`/product/${productId}?article=제품문의`)
        : router.push(`/users/${userId}?article=qna`);
    } catch (error) {
      alert(error);
    }
  };

  const handleUpdateFormSubmit = async (data: any) => {
    if (loading) return;

    setLoading(true);
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
        await deleteMultipleImage("qna", deletePreImageURLList);
      }
      let newImageURLList;
      if (newImageFileList.length > 0) {
        const res = await uploadMultipleImages(newImageFileList, "qna", newImageFileIdList, storagePath);
        newImageURLList = res as string[];
      }

      const formData = {
        ...data,
        url: newImageURLList ? [...preImageURLList, ...newImageURLList] : preImageURLList
      };

      await updateUserQna({ userId, qnaId: qnaData.id, body: JSON.stringify(formData) });
      setLoading(false);
      return qnaData?.product_id
        ? router.push(`/product/${qnaData.product_id}?article=제품문의`)
        : router.push(`/users/${userId}?article=qna`);
    } catch (error) {
      alert(error);
      return router.push(`/`);
    }
  };

  return (
    <form onSubmit={qnaData ? handleSubmit(handleUpdateFormSubmit) : handleSubmit(handleCreateFormSubmit)}>
      {loading && <Spinner size="lg" />}
      <FormFieldSet title={`문의 제목`}>
        <input
          type="text"
          placeholder={`문의 제목을 입력해주세요.`}
          className="p-[15px] w-full border-[1px] border-[#E5E5E5] "
          defaultValue={qnaData?.title}
          {...register("title")}
        />
      </FormFieldSet>
      <FormFieldSet title={"문의 내용"}>
        <textarea
          id="form__content"
          className="p-[15px] w-full min-h-[250px] border-[1px] border-line "
          placeholder="문의 내용을 입력해주세요."
          defaultValue={qnaData?.content}
          {...register("content", { required: true, maxLength: 500 })}
        />
      </FormFieldSet>
      <FormFieldSet title="사진첨부">
        <InputImage customImageList={customImageList} isEnter={isEnter} handler={handler} />
      </FormFieldSet>
      <div className="flex flex-row  sm:w-full sm:flex-wrap  gap-[12px] mt-[60px] justify-center">
        <CustomButton type="submit" size="lg" className="sm:w-full">
          {qnaData ? "수정하기" : "등록하기"}
        </CustomButton>

        <CustomButton type="button" size="lg" color="white" className="sm:w-full" onClick={router.back}>
          취소
        </CustomButton>
      </div>
    </form>
  );
};

export default QnaForm;
