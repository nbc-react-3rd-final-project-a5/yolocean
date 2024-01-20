"use client";
import React, { useState } from "react";
import CartItem from "../cart/CartItem";
import { CartBox } from "@/types/db";
import { useCart } from "@/hooks";
import { UserInfo } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

import Section from "@/components/layout/Section";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { useForm } from "react-hook-form";
import { createPayment } from "@/lib/portone";
import { usealertStore } from "@/store/alertStore";
import { openConfirm } from "@/store/confirmStore";
import { useRouter } from "next/navigation";

const linkList = [
  {
    name: "홈",
    url: "http://localhost:3000/"
  },
  {
    name: "장바구니",
    url: "http://localhost:3000/cart"
  },
  {
    name: "주문서",
    url: "http://localhost:3000/payment"
  }
];

const PaymentPage = () => {
  //useCart에 사용자 id
  const { auth } = useAuthStore();
  const { cart, isLoading, deleteUserCartMutation } = useCart({ userId: auth, cartId: "" });
  const shop = cart !== undefined ? cart[0].store.name : "no-shop";

  //상품별 총금액(할인적용)
  const [cartPrice, setCartPrice] = useState<number[]>([]);
  const [originPrice, setOriginPrice] = useState<number[]>([]);
  let discountedPrice = cartPrice.reduce((acc, num) => acc + num, 0); //햘인 가격
  let salePrice = originPrice.reduce((acc, num) => acc + num, 0); //비할인 가격

  const { data: user, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<UserInfo> => {
      const result = await fetch(`/api/users/${auth}`, { method: "GET" });
      if (!result.ok) {
        throw new Error("유저 정보 불러오기 실패");
      }
      return await result.json();
    }
  });

  // === 결제 관련 ===
  const { alertFire } = usealertStore();
  const {
    register,
    formState: { isValid }
  } = useForm({ mode: "onBlur" });
  const router = useRouter();

  // 결제하기 버튼 핸들러
  const handlePaymentClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    // if (!user?.phone) return alertFire("회원 전화번호 입력 에러", "error");
    // const { isPass, msg } = await createPayment({ amount: discountedPrice, buyer_tel: user?.phone || "01012341234" });

    // if (isPass) {
    //   // 결제 성공 후 진행할 로직
    //   deleteUserCartMutation.mutate(auth);

    //   alertFire("결제 성공", "success");
    // } else {
    //   // 결제 실패 시 진행할 로직
    //   alertFire(msg, "error");
    // }
    console.log(cart);
  };

  // 취소하기 버튼 핸들러
  const handleCancelClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const result: boolean = await openConfirm("결제 취소", "결제를 취소하시겠습니까?");
    result && router.push(`/cart`);
  };

  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <Section title={"주문서"} isCenter={true}>
        {!isLoading && cart !== undefined ? (
          <div className="mb-[120px]">
            <div className="flex flex-col items-center justify-center">
              {(cart as CartBox[]).map((cartItem, idx) => {
                return (
                  cartItem && (
                    <CartItem
                      cart={cartItem}
                      cartPrice={cartPrice}
                      setCartPrice={setCartPrice}
                      originPrice={originPrice}
                      setOriginPrice={setOriginPrice}
                      idx={idx}
                      key={cartItem.id}
                    />
                  )
                );
              })}
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <form action="">
          <div>
            <div className="border-black border-b">
              <h2 className="mb-4 font-bold text-[20px]">렌탈 약관동의</h2>
            </div>

            <div className="p-7 border-b text-tc-middle">
              <input id="fullTerms" type="checkbox" {...register("fullTerms")} required className="w-4 h-4 mr-[20px]" />
              <label htmlFor="fullTerms">전체 약관 동의 (필수)</label>
            </div>
            <div className="p-7 border-b text-tc-middle flex justify-between">
              <div>
                <input
                  id="protection"
                  type="checkbox"
                  {...register("protection", { required: "필수체크 사항입니다." })}
                  className="w-4 h-4 mr-[20px]"
                />
                <label htmlFor="protection">개인 정보 보호를 위한 이용자 동의 (필수)</label>
              </div>
              <p className="text-[14px] font-medium text-tc-light text underline cursor-pointer">내역보기</p>
            </div>
            <div className="p-7 border-b text-tc-middle flex justify-between">
              <div>
                <input
                  id="useTerms"
                  type="checkbox"
                  {...register("useTerms", { required: "필수체크 사항입니다." })}
                  required
                  className="w-4 h-4 mr-[20px]"
                />
                <label htmlFor="useTerms">렌트 상품 이용약관 동의 (필수)</label>
              </div>
              <p className="text-[14px] font-medium text-tc-light text underline cursor-pointer">내역보기</p>
            </div>
          </div>
          <div className="mt-[60px] text-tc-middle">
            <div className="border-black border-b mt-[60px]">
              <h2 className="mb-4 font-bold text-[20px] text-black">신청인 정보</h2>
            </div>
            <div className="grid grid-cols-8 place-items-baseline my-[30px] gap-[15px]">
              <p className=" text-[16px] font-medium">신청인</p>
              <p className="col-span-7 w-[800px] p-[15px]  border">{user?.username}</p>

              <p className=" text-[16px] font-medium">이메일</p>
              <p className="col-span-7 w-[800px] p-[15px] border">{user?.email}</p>

              <p className=" text-[16px] font-medium">휴대폰 번호</p>
              <p className="col-span-7 w-[800px] p-[15px] border">{user?.phone}</p>

              <p className=" text-[16px] font-medium">수령지점</p>
              <p className="col-span-7 w-[800px] p-[15px] border">{shop}</p>
            </div>
          </div>
          <div className="flex border-black border-y justify-between">
            <div className="">
              <h2 className="mt-[30px] font-bold text-[20px] text-black">총 주문금액</h2>
            </div>
            <div className="mt-[30px] w-[400px] text-[16px] font-medium text-tc-middle">
              <div className=" border-b">
                <div className="flex justify-between mb-[20px]">
                  <p>주문 금액</p>
                  <p>{salePrice}원</p>
                </div>
                <div className="flex justify-between  mb-[30px]">
                  <p>할인 금액</p>
                  <p>-{salePrice - discountedPrice}원</p>
                </div>
              </div>
              <div className="flex justify-between my-[30px]">
                <p className="text-black text-[20px] font-bold">최종 결제금액</p>
                <p className="text-point text-[24px] font-bold">{discountedPrice}원</p>
              </div>
            </div>
          </div>
          <div className="mt-[22px] mb-[100px] text-[14px] font-medium text-tc-light">
            <input
              id="payAgree"
              type="checkbox"
              {...register("payAgree", { required: "필수체크 사항입니다." })}
              className="w-4 h-4 mr-[20px]"
            />
            <label htmlFor="payAgree">
              렌탈을 진행하실 제품, 신청인 정보, 할인 내역 등을 최종 확인하였으며, 결제에 동의하시겠습니까?(전자상거래법
              제8조 제2항)
            </label>
          </div>
        </form>
        <div className="flex items-center justify-center space-x-[12px]">
          <button
            disabled={!isValid}
            onClick={handlePaymentClick}
            type="button"
            className="w-[290px] h-[50px] bg-point text-[16px] font-semibold text-white rounded-[5px] disabled:bg-line disabled:text-tc-light"
          >
            결제하기
          </button>
          <button
            onClick={handleCancelClick}
            className="w-[290px] h-[50px] bg-tc-middle text-[16px] font-semibold text-white rounded-[5px]"
          >
            취소
          </button>
        </div>
      </Section>
    </>
  );
};

export default PaymentPage;
