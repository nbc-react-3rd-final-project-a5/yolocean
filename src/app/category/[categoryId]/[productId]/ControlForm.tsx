"use client";
import NumberInput from "@/components/NumberInput";
import React, { useEffect } from "react";
import { FieldValues, useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import { useOfficeStore } from "@/store/officeStore";
import { useModalStore } from "@/store/modalStore";
import SelectOffice from "../SelectOffice";
import { MdErrorOutline } from "react-icons/md";
import { openConfirm } from "@/store/confirmStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { IoShareSocial } from "react-icons/io5";
import ShareModal from "./ShareModal";
import { getCart, updateCart } from "@/service/table";

interface Props {
  category_name: string;
  name: string;
  price: number;
  original_price: number;
  product_id: string;
  percentage_off: null | number;
}

const ControlForm = ({ category_name, name, price, original_price, product_id, percentage_off }: Props) => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
    control,
    clearErrors,
    handleSubmit
  } = useForm({ mode: "onChange", shouldFocusError: false });
  const { office } = useOfficeStore();
  const { openModal } = useModalStore();
  const router = useRouter();
  const { auth: user_id } = useAuthStore();

  useEffect(() => {
    setValue("address", office.name);
    clearErrors("address");
  }, [office.name, setValue, clearErrors]);

  async function handleFormSubmit(onValid: FieldValues, event: any) {
    const submitType = event.nativeEvent.submitter.name;
    const { rent_date, count } = onValid;
    const store_id = office.id;
    const body = JSON.stringify({ product_id, user_id, rent_date, count, store_id });
    const cart = await getCart({ productId: product_id, userId: user_id });

    addCart(body, submitType, cart);
  }

  async function addCart(body: string, submitType: string, cart: any) {
    // const response = await fetch(`/api/cart/${auth}`, { body, method: "POST" });

    const response = await updateCart({ userId: user_id, body, cartId: cart.id });
    const { message } = await response.json();

    if (submitType === "cart") {
      const answer = await openConfirm(message, "장바구니를 바로 확인하시겠습니까?");
      if (answer) {
        router.push(`/cart/${user_id}`);
      }
    }

    if (submitType === "buy") {
      const answer = await openConfirm(message, "구매페이지로 이동하시겠습니까?");
      if (answer) {
        router.push(`/payment/${user_id}`);
      }
    }
  }

  return (
    <>
      <div className="flex-1 text-[16px]">
        <div className="flex justify-between items-center mb-[20px]">
          <p className="text-[15px] text-tc-light ">{category_name}</p>
          <IoShareSocial
            size={15}
            className="text-point cursor-pointer"
            onClick={() => {
              openModal(<ShareModal />);
            }}
          />
        </div>
        <h1 className="text-[18px] mb-[30px] leading-[27px]">{name}</h1>

        <hr className="border-line border-[1px] " />
        <div className="py-[20px] flex flex-col gap-[20px] font-medium text-[16px]">
          <div className="flex gap-[12px]">
            <p className="w-[89px]">제품가</p>
            <p>{price}원</p>
          </div>
          {percentage_off && (
            <div className="flex gap-[12px] ">
              <p className="w-[89px]">할인가</p>
              <p>{Math.floor(price - (price - (price * percentage_off) / 100))}원</p>
            </div>
          )}
          <div className="flex gap-[12px] ">
            <p className="w-[89px]">최종가격</p>
            {percentage_off && <p className="font-[700]">{Math.floor(price - (price * percentage_off) / 100)}원</p>}
            {!percentage_off && <p className="font-[700]">{price}원</p>}
          </div>
        </div>

        <hr className="border-line border-[1px]" />
        <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-[10px] my-[20px]">
          <div className="flex items-center text-tc-middle gap-[12px]">
            <label className="w-[89px]" htmlFor="rent_date">
              날짜
            </label>
            <Controller
              rules={{
                required: "날짜를 선택해주세요",
                pattern: /^d{4}.d{2}.d{2}$/
              }}
              control={control}
              name="rent_date"
              render={({ field }) => (
                <DatePicker
                  className="py-[8px] px-[20px] border-line border rounded-md w-[292px] font-[500] text-[12px]"
                  dateFormat="yyyy.MM.dd"
                  locale={ko}
                  id="rent_date"
                  minDate={new Date(Date.now())}
                  placeholderText="날짜를 선택해주세요"
                  onChangeRaw={(e) => (e.target.value = "")}
                  onChange={(date) => field.onChange(date)}
                  selected={field.value}
                  autoComplete="off"
                />
              )}
            />
            <div className="flex text-red-400 text-[12px] gap-1">
              {errors["rent_date"] && (
                <>
                  <MdErrorOutline />
                  {errors["rent_date"]?.message as string}
                </>
              )}
            </div>
          </div>
          <div className="flex items-center gap-[12px]">
            <label className="w-[89px]" htmlFor="address">
              위치
            </label>
            <input
              id="address"
              placeholder="위치를 선택해 주세요"
              readOnly
              onClick={() => openModal(<SelectOffice />)}
              className="py-[8px] px-[20px] border-line border rounded-md w-[292px] font-[500] text-[12px]"
              {...register("address", {
                value: office.name,
                required: "날짜를 선택해주세요"
              })}
            />
            <div className="flex text-red-400 text-[12px] gap-1">
              {errors.address && (
                <>
                  <MdErrorOutline />
                  {errors.address?.message as string}
                </>
              )}
            </div>
          </div>
          <div className="flex gap-[12px] ">
            <label className="w-[89px]" htmlFor="count">
              수량
            </label>
            <NumberInput setValue={setValue} getValues={getValues} register={register} errors={errors} name="count" />
          </div>
          <div className="flex mt-[40px] mb-[100px] text-[16px] font-[600] gap-[5px] text-white">
            <button name="cart" className="w-[244px] h-[50px] border-point border rounded-sm text-point">
              장바구니 담기
            </button>
            <button name="buy" className="w-[244px] h-[50px] border-point border rounded-sm bg-point">
              구매하기
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ControlForm;
