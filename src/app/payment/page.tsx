"use client";
import React, { useState } from "react";
import CartItem from "../cart/CartItem";
import { CartBox } from "../cart/page";
import { useCart } from "@/hooks";
import Section from "@/components/layout/Section";

const page = () => {
  //useCart에 사용자 id
  const { cart, isLoading } = useCart({ userId: "aba26c49-82c0-42b2-913c-c7676527b553", cartId: "" });

  //상품별 총금액
  const [cartPrice, setCartPrice] = useState<number[]>([]);

  return (
    <>
      <Section title={"렌탈 신청"} isCenter={true}>
        <h2 className="border-b-4 mb-3">렌탈 제품 정보</h2>
        {!isLoading ? (
          <div>
            <div className="flex flex-col items-center justify-center">
              {(cart as CartBox[]).map((cartItem, idx) => {
                return (
                  cartItem && (
                    <CartItem
                      cart={cartItem}
                      cartPrice={cartPrice}
                      setCartPrice={setCartPrice}
                      idx={idx}
                      key={cartItem.id}
                    />
                  )
                );
              })}
            </div>

            <div>
              <p>총금액</p>
              <p>{cartPrice.reduce((acc, num) => acc + num, 0)}원</p>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <h2 className="border-b-4 my-5">렌탈 약관 동의</h2>
        <form action="">
          <input type="radio" required /> 전체 약관 동의 (필수)
          <br />
          <input type="radio" required /> 개인 정보 보호를 위한 이용자 동의 (필수)
          <br />
          <input type="radio" required /> 렌트 상품 이용약관 동의 (필수)
          <h2 className="border-b-4 my-5">신청자 정보</h2>
          <label htmlFor="name">신청인</label>
          <input type="text" id="name" required />
          <br />
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" required />
          <br />
          <label htmlFor="phone">휴대전화</label>
          <input type="tel" id="phone" required />
          <br />
          <label htmlFor="shop">수령지점</label>
          <input type="text" id="shop" required />
          <h2 className="border-b-4 my-5">총 주문 금액</h2>
          <p>주문 금액</p>
          <p>{cartPrice.reduce((acc, num) => acc + num, 0)}원</p>
          <p>할인 금액</p>
          <p>{0}원</p>
          <p>최종결제금액</p>
          <p>{cartPrice.reduce((acc, num) => acc + num, 0)}원</p>
          <input type="radio" required />
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

export default page;
