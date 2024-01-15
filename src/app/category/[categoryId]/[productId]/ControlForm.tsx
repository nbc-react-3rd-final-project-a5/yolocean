"use client";
import NumberInput from "@/components/NumberInput";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useStore } from "zustand";
import { useOfficeStore } from "@/store/officeStore";
import { useModalStore } from "@/store/modalStore";
import { FaLocationDot } from "react-icons/fa6";
import SelectOffice from "../SelectOffice";

interface Props {
  category_name: string;
  name: string;
  price: number;
}

const ControlForm = ({ category_name, name, price }: Props) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
    handleSubmit
  } = useForm({ mode: "onChange" });
  const { office } = useStore(useOfficeStore);
  const { openModal } = useStore(useModalStore);

  useEffect(() => {
    setValue("address", office.name);
  }, [office.name, setValue]);

  function handleAddCartSubmit(onValid: FieldValues) {
    console.log(onValid);
  }

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

        <form onSubmit={handleSubmit(handleAddCartSubmit)} className="flex flex-col gap-[10px] my-[17px]">
          <div className="flex items-center gap-[22px]">
            <label htmlFor="date"> 날짜</label>
            <Controller
              rules={{
                required: "필수 입력값입니다.",
                pattern: /^d{4}.d{2}.d{2}$/
              }}
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  className="py-1 text-center border-2 rounded-md text-[12px]"
                  dateFormat="yyyy.MM.dd"
                  locale={ko}
                  id="date"
                  autoComplete="off"
                  minDate={new Date(Date.now())}
                  placeholderText="날짜를 입력해주세요"
                  onChangeRaw={(e) => (e.target.value = "")}
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </div>
          <div className="flex gap-[22px]">
            <label htmlFor="address">위치</label>
            <input
              readOnly
              className="w-fit outline-none text-[12px] border-2 p-1 rounded-md "
              {...register("address", {
                value: office.name,
                required: true
              })}
            />
            <button
              id="address"
              className="bg-[#3074F0] text-white text-[14px] flex items-center gap-[6px] justify-center w-[89px] h-[24px] rounded-[999px]"
              onClick={() => {
                openModal("위치선택", <SelectOffice />);
              }}
            >
              <FaLocationDot />
              <p>위치 선택</p>
            </button>
          </div>
          <div className="flex gap-[22px] items-center">
            <label htmlFor="count">수량</label>
            <NumberInput setValue={setValue} getValues={getValues} register={register} errors={errors} name="count" />
          </div>
          <div className="flex mt-[10px] gap-[22px]">
            <button className="p-[12px] border-4 border-[#9747FF] rounded-md">장바구니 담기</button>
            <button className="p-[12px] border-4 border-[#9747FF] rounded-md">바로구매하기</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ControlForm;
