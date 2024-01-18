"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Review } from "@/types/db";

interface Props {
  formType: "review" | "qna";
  userId: string;
  productId: string;
  review?: Review;
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
const QnaForm = ({ userId, productId, review }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode: "onChange" });

  const handleFormSubmit = async (data: any) => {
    if (review) {
      const body = JSON.stringify({ ...data });
      const respones = await fetch(`/api/qna/user/${review.id}`, { body, method: "POST" });
      const result = await respones.json();
      console.log(result);
    }

    if (!review) {
      const body = JSON.stringify({ ...data, user_id: userId, product_id: productId });
      const respones = await fetch(`/api/qna/`, { body, method: "POST" });
      const result = await respones.json();
      console.log(result);
    }

    // try {
    //   const formData: TablesInsert<"review"> = {
    //     user_id: userId,
    //     title: data.title,
    //     product_id: productId,
    //     content: data.content
    //   };
    //   const res = await fetch(`${window.location.origin}/api/qna/user/${review.id}`, {
    //     method: "POST",
    //     body: JSON.stringify(formData)
    //   });
    //   console.log(res);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormFieldSet title={`문의 제목`}>
        <input
          type="text"
          placeholder={`문의 제목을 입력해주세요.`}
          className="p-[15px] w-full border-[1px] border-[#E5E5E5] "
          defaultValue={review?.title}
          {...register("title")}
        />
      </FormFieldSet>
      <FormFieldSet title={"문의 내용"}>
        <textarea
          id="form__content"
          className="p-[15px] w-full min-h-[250px] border-[1px] border-line "
          placeholder="문의 내용을 입력해주세요."
          defaultValue={review?.content}
          {...register("content", { required: true, maxLength: 500 })}
        />
      </FormFieldSet>

      <div className="flex flex-row gap-[12px] mt-[60px]">
        {review ? (
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

export default QnaForm;
