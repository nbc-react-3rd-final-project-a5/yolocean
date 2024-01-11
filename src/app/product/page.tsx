"use client";
import Card from "@/components/Card";
import ContextInput from "@/components/ContextInput";
import Input from "@/components/Input";
import Tab from "@/components/Tab";
import useProduct from "@/hooks/useProduct";
import KakaoMap from "@/lib/KakaoMap";
import { usealertStore } from "@/store/alertStore";
import { useModalStore } from "@/store/modalStore";
import { ProductProperties } from "@/types/db";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const ProductPage = () => {
  const { product, isLoading } = useProduct();
  const { isModalOpen, openModal } = useModalStore();
  const { alertFire } = usealertStore();

  const [activeTab, setActiveTab] = useState(0);
  function onClickTab(index: number) {
    return setActiveTab(index);
  }

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm({ mode: "onChange" });
  const test = useForm({ mode: "onChange" });
  const methods = useForm({ mode: "onChange" });
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {!isLoading &&
          (product as ProductProperties[]).map((product) => <ProductCard product={product} key={product.id} />)}
        <button
          onClick={() => {
            openModal(<KakaoMap />);
          }}
        >
          모달오픈!
        </button>
        <button
          onClick={() => {
            alertFire("실패", "error");
          }}
        >
          alert오픈!
        </button>
      </div>
      <Tab activeTab={activeTab} onClickTabFn={onClickTab} tabs={["예약", "렌트 완료", "작성한 리뷰", "Q&A"]} />
      {/* <Card /> */}
      <Input
        register={register}
        formStateErrors={errors}
        type="password"
        placeholder="비밀번호를 입력하라"
        name="password"
        label="비밀번호"
        required="비밀번호는 필수다"
        pattern={/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/}
        errorMessage="영문 숫자 조합 8자리 이상으로 입력해주세요"
        watch={watch}
        setError={setError}
        clearErrors={clearErrors}
      />
      <Input
        watch={watch}
        setError={setError}
        clearErrors={clearErrors}
        register={register}
        formStateErrors={errors}
        required={"필수다"}
        type="password"
        name="password_check"
        placeholder="비밀번호를 다시 입력하라"
        label="비밀번호 확인"
        observerValue="password"
        pattern={/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/}
        errorMessage="영문 숫자 조합 8자리 이상으로 입력해주세요"
        validate={(value: any) => {
          if (value === watch("password")) return true;
          else {
            return "비밀번호가 일치하지 않습니다";
          }
        }}
      />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ContextInput
            label="ContextInput 비밀번호"
            name="password"
            placeholder="비밀번호를 입력하세요"
            required="필수 입력사항입니다."
            errorMessage="비밀번호가 올바르지않습니다."
            pattern={/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/}
            type="password"
          />
          <ContextInput
            label="ContextInput 비밀번호확인"
            name="password_check"
            placeholder="비밀번호를 다시 입력하세요"
            required="필수 입력사항입니다."
            errorMessage="비밀번호가 올바르지않습니다."
            observerValue="password"
            pattern={/^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/}
            type="password"
          />

          <button type="submit">제출</button>
        </form>
      </FormProvider>
    </>
  );
};

export default ProductPage;

interface IProps {
  product: ProductProperties;
}

function ProductCard({ product: { id, price, category, thumbnail, name } }: IProps) {
  return (
    <Link href={`/product/${id}`} className="flex-1">
      <div className=" bg-white text-black rounded-md overflow-hidden">
        <div className="w-full h-[150px] relative">
          {/* <Image priority sizes="100%" src={thumbnail} alt="productThumbnail" layout="fill" /> */}
        </div>
        <div className="px-1 py-2">
          <span className="text-xs text-neutral-600">{category.category_name}</span>

          <div className="flex justify-between text-sm font-medium">
            <h1>{name}</h1>
            <span>{price.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
