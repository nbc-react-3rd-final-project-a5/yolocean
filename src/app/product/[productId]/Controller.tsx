"use client";
import NumberInput from "@/components/NumberInput";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
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
  const [startDate, setStartDate] = useState<Date | null>(null);

  console.log(getValues("date"));
  console.log(startDate);
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

        <div className="flex flex-col gap-[10px] my-[17px]">
          <div className="flex items-center gap-[22px]">
            <label htmlFor="date"> 날짜</label>
            <DatePicker
              {...register("date", {})}
              className="py-1 text-center border-2 rounded-md text-[12px]"
              placeholderText="날짜를 선택해주세요"
              id="date"
              locale={ko}
              dateFormat="yyyy.MM.dd(eee)"
              selected={startDate}
              minDate={new Date(Date.now())}
              onChangeRaw={(e) => e.preventDefault()}
              onChange={(date: Date) => {
                setStartDate(date);
              }}
            />
          </div>
          <div className="flex gap-[22px]">
            <label htmlFor="address">위치</label>
            <input id="address" type="text" />
          </div>
          <div className="flex gap-[22px] items-center">
            <label htmlFor="count">수량</label>
            <NumberInput errors={errors} register={register} setValue={setValue} getValues={getValues} name="테스트" />
          </div>
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
