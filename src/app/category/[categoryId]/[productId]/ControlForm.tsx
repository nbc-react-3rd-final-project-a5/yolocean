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
  original_price: number;
}

const ControlForm = ({ category_name, name, price, original_price }: Props) => {
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
        <p className="text-[15px] text-[#999999] mb-[20px]">{category_name}</p>
        <h1 className="text-[18px] mb-[30px] leading-[27px]">{name}</h1>
        <hr className="border-[#E5E5E5] border-[1px] " />
        <div className="py-[20px] flex flex-col gap-[20px] font-medium text-[16px]">
          <div className="flex gap-[12px]">
            <p className="w-[89px]">제품가</p>
            <p>{original_price}</p>
          </div>
          <div className="flex gap-[12px] ">
            <p className="w-[89px]">할인가</p>
            <p>할인가격</p>
          </div>
          <div className="flex gap-[12px] ">
            <p className="w-[89px]">수령방법</p>
            <p>현장수령</p>
          </div>
          <div className="flex gap-[12px] ">
            <p className="w-[89px]">최종가격</p>
            <p className="font-[700]">{price}원</p>
          </div>
        </div>
        <hr className="border-[#E5E5E5] border-[1px]" />

        <form onSubmit={handleSubmit(handleAddCartSubmit)} className="flex flex-col gap-[10px] my-[20px]">
          <div className="flex items-center text-[#595959] gap-[12px]">
            <label className="w-[89px]" htmlFor="date">
              날짜
            </label>
            <Controller
              rules={{
                required: "필수 입력값입니다.",
                pattern: /^d{4}.d{2}.d{2}$/
              }}
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  className="py-[8px] px-[20px] border-[#E5E5E5] border rounded-md w-[292px] font-[500] text-[12px]"
                  dateFormat="yyyy.MM.dd"
                  locale={ko}
                  id="date"
                  autoComplete="off"
                  minDate={new Date(Date.now())}
                  placeholderText="날짜를 선택해주세요"
                  onChangeRaw={(e) => (e.target.value = "")}
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
          </div>
          <div className="flex gap-[12px]">
            <label className="w-[89px]" htmlFor="address">
              위치
            </label>
            <input
              id="address"
              placeholder="위치를 선택해 주세요"
              readOnly
              onClick={() => openModal("위치선택", <SelectOffice />)}
              className="py-[8px] px-[20px] border-[#E5E5E5] border rounded-md w-[292px] font-[500] text-[12px]"
              {...register("address", {
                value: office.name,
                required: true
              })}
            />
          </div>
          <div className="flex gap-[12px] ">
            <label className="w-[89px]" htmlFor="count">
              수량
            </label>
            <NumberInput setValue={setValue} getValues={getValues} register={register} errors={errors} name="count" />
          </div>
          <div className="flex mt-[40px] mb-[100px] text-[16px] font-[600] gap-[5px] text-white">
            <button className="w-[244px] h-[50px] border-[#3074F0] border rounded-sm text-[#3074F0]">
              장바구니 담기
            </button>
            <button className="w-[244px] h-[50px] border-[#3074F0] border rounded-sm bg-[#3074F0]">구매하기</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ControlForm;
