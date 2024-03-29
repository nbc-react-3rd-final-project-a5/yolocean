"use client";
import Avatar from "@/components/Avatar";
import CustomButton from "@/components/CustomButton";
import { openConfirm } from "@/store/confirmStore";
import { convertTime } from "@/utils/convertTime";
import { UseMutateFunction } from "@tanstack/react-query";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface Props {
  page: number;
  answer: string;
  data: any;
  category: string;
  createAnswer: UseMutateFunction<unknown, Error, any, unknown>;
  deleteQna: UseMutateFunction<unknown, Error, any, unknown>;
}

const QnaCard = ({ data, page, answer, category, createAnswer, deleteQna }: Props) => {
  const user = data.userinfo;
  const product = data.product;
  const { shortDateFormat } = convertTime(data.created_at);
  const { register, handleSubmit } = useForm({ mode: "onChange" });
  const [editMode, setEditMode] = useState(false);

  function onAnswerSubmit(value: any) {
    const body = JSON.stringify({ ...value });
    createAnswer({ body, qnaId: data.id, userId: user.id });
    setEditMode(false);
  }

  async function onClickDeleteQna() {
    const agreed = await openConfirm("해당문의를 삭제하시겠습니까?", "대답");
    if (agreed) {
      deleteQna({ qnaId: data.id, userId: user.id });
      return;
    }
    return;
  }

  return (
    <div className="flex flex-col gap-[20px] border-b-line border-b-2">
      <div></div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[24px]">
          <Avatar size="sm" src={user.avatar_url} />
          <p className="font-medium text-tc-light">{user.username}</p>
        </div>
        <p className="font-medium text-tc-light ">{shortDateFormat}</p>
      </div>
      <div>
        <div className="flex items-center gap-[15px]">
          <h1 className="font-medium text-[17px] text-tc-base pb-[10px]">{product.name} /</h1>
          <h1 className="font-medium text-[17px] text-tc-base pb-[10px]">{data.title}</h1>
        </div>
        <p className="font-medium text-[15px] text-tc-middle leading-normal">Q {data.content}</p>
      </div>
      <ul className="flex flex-row gap-[12px]">
        <li>
          <Image src={product.thumbnail} alt="문의한 상품" width={190} height={190} />
        </li>
        {data.url?.map((n: any, i: number) => (
          <li key={`${data.id}-${i}`}>
            <figure className="w-[190px] h-[190px] border-[1px] border-line rounded-[5px] overflow-hidden mobile:h-[100px] mobile:w-[100px] ">
              <Image src={n} width={190} height={190} alt={`Qna 이미지`} />
            </figure>
          </li>
        ))}
      </ul>

      <h1
        className="font-medium text-[17px] text-tc-base pb-[10px] w-full cursor-pointer"
        onClick={() => setEditMode((prev) => !prev)}
      >
        <strong className="text-[20px]">A </strong> {data.answer}
      </h1>
      {editMode && (
        <form className="flex flex-col gap-[10px]" onSubmit={handleSubmit((value) => onAnswerSubmit(value))}>
          <textarea
            rows={3}
            {...register("answer", { required: true, value: data.answer })}
            className="resize-none w-full border rounded-md"
          />

          <div className="flex justify-end gap-[20px]">
            <CustomButton type="submit">답변하기</CustomButton>
            <CustomButton
              type="button"
              className="bg-red-500"
              onClick={async () => {
                await onClickDeleteQna();
              }}
            >
              문의삭제
            </CustomButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default QnaCard;
