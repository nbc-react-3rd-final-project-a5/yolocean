"use client";
import React, { useState } from "react";
import CartItem from "../cart/CartItem";
import { CartBox } from "../cart/page";
import { useCart } from "@/hooks";
import { UserInfo } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/store/authStore";

import Section from "@/components/layout/Section";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";

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
  const { cart, isLoading } = useCart({ userId: auth, cartId: "" });
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
  console.log(user);

  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <Section title={"주문서"} isCenter={true}>
        {!isLoading && cart !== undefined ? (
          <div>
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
            <h2 className="border-b-4 my-5">렌탈 약관 동의</h2>
            <input type="checkbox" required /> 전체 약관 동의 (필수)
            <br />
            <input type="checkbox" required /> 개인 정보 보호를 위한 이용자 동의 (필수)
            <br />
            <input type="checkbox" required /> 렌트 상품 이용약관 동의 (필수)
          </div>
          <div>
            <h2 className="border-b-4 my-5">신청자 정보</h2>
            <div>
              신청인
              <p>{user?.username}</p>
            </div>

            <div>
              이메일
              <p>{user?.email}</p>
            </div>

            <div>
              휴대전화
              <p>010-1234-5678</p>
            </div>

            <div>
              수령지점
              <p>{shop}</p>
            </div>
          </div>
          <div>
            <h2 className="border-b-4 my-5">총 주문 금액</h2>
            <p>주문 금액</p>
            <p>{salePrice}원</p>
            <p>할인 금액</p>
            <p>{salePrice - discountedPrice}원</p>
            <p>최종결제금액</p>
            <p>{discountedPrice}원</p>
          </div>
          <input type="checkbox" required />
          렌탈을 진행하실 제품, 신청인 정보, 할인 내역 등을 최종 확인하였으며, 결제에 동의하시겠습니까?(전자상거래법
          제8조 제2항)
        </form>
        <div>
          <button>취소하기</button>
          <button>결제하기</button>
        </div>
      </Section>
    </>
  );
};

export default PaymentPage;
