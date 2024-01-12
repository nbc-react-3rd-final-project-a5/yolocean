"use client";
import NumberInput from "@/components/NumberInput";
import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  category_name: string;
  name: string;
  price: number;
}

const Controller = ({ category_name, name, price }: Props) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ mode: "onChange" });
  return (
    <>
      <div className="flex-1 text-[16px]">
        <span className="text-[14px]">{category_name}</span>
        <h1 className="mt-[6px] mb-[20px]">{name}</h1>
        <hr className="border-[#757575] border-[1.5px] " />
        <div className="py-[20px]">
          <p className="line-through">{price}</p>
          <div className="text-[#F24822] flex gap-[8px] ">
            <span>할인가격</span>
            <span>할인퍼센트</span>
          </div>
        </div>
        <hr className="border-[#757575] border-[1.5px] " />

        <div className="flex gap-[22px]">
          <label htmlFor="date"> 날짜</label>
          <input id="date" type="date" />
        </div>
        <div className="flex gap-[22px]">
          <label htmlFor="address">위치</label>
          <input id="address" type="text" />
        </div>
        <div className="flex gap-[22px] items-center">
          <label htmlFor="count">수량</label>
          <NumberInput errors={errors} register={register} setValue={setValue} getValues={getValues} name="테스트" />
        </div>
        <div className="flex my-[10px] gap-[22px]">
          <button className="p-[12px] border-4 border-[#9747FF] rounded-md">장바구니 담기</button>
          <button className="p-[12px] border-4 border-[#9747FF] rounded-md">바로구매하기</button>
        </div>
      </div>
    </>
  );
};

export default Controller;
