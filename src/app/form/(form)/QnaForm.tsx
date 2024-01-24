"use client";

import FormFieldSet from "@/components/form/FormFieldSet";
import { useAuthStore } from "@/store/authStore";
import { ExtendQna } from "@/types/db";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  qnaData: ExtendQna;
  productId: string;
}

const QnaForm = ({ qnaData, productId }: Props) => {
  const { auth: userId } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  const handleCreateFormSubmit = async (data: any) => {
    const body = JSON.stringify({ ...data, user_id: userId, product_id: productId });
    const respones = await fetch(`/api/qna/`, { body, method: "POST" });
    const result = await respones.json();
    productId ? router.push(`/category/${result.category_id}/${productId}#제품문의`) : router.push(`/users/${userId}`);
  };

  const handleUpdateFormSubmit = async (data: any) => {
    const body = JSON.stringify({ ...data });
    const respones = await fetch(`/api/qna/user/${qnaData.id}`, { body, method: "POST" });
    const result = await respones.json();
    router.push(`/category/${qnaData.product.category_id}/${qnaData.product_id}#제품문의`);
  };

  return (
    <form onSubmit={qnaData ? handleSubmit(handleCreateFormSubmit) : handleSubmit(handleUpdateFormSubmit)}>
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

      <div className="flex flex-row gap-[12px] mt-[60px]">
        <input
          type="submit"
          className="p-[16px] flex-grow text-[18px] cursor-pointer leading-none rounded-[5px] font-[600] text-[#FFFFFF] bg-[#3074F0] "
          value={qnaData ? "수정하기" : "등록하기"}
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

export default QnaForm;
