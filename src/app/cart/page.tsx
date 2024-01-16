"use client";
import React, { useEffect, useState } from "react";
import Section from "@/components/layout/Section";
import CartItem from "./CartItem";
import { useCart } from "@/hooks";
import Link from "next/link";

export interface CartBox {
  count: number | null;
  id: string;
  product_id: string | null;
  store_id: string | null;
  user_id: string;
  rent_date: string;
  product: {
    name: string;
    thumbnail: string;
    price: number;
    percentage_off: number;
    category: {
      category_name: string;
    };
  };
  store: {
    name: string;
  };
}

const page = () => {
  //useCart에 사용자 id
  const { cart, isLoading } = useCart({ userId: "aba26c49-82c0-42b2-913c-c7676527b553", cartId: "" });

  //총 상품 금액?!?!?
  let totalPrice = 0;
  const [total, setTotal] = useState<number>(0);
  // console.log(total);

  if (cart !== undefined) {
    (cart as CartBox[]).forEach((cartItem) => {
      if (cartItem.count !== null) {
        totalPrice += cartItem.product.price * cartItem.count;
      }
    });
  }

  return (
    <>
      <Section title={"장바구니"} isCenter={true}>
        {!isLoading ? (
          <div>
            <div className="flex flex-col items-center justify-center">
              {(cart as CartBox[]).map((cartItem) => {
                return (
                  cartItem && (
                    <CartItem
                      cart={cartItem}
                      total={total}
                      setTotal={setTotal}
                      initTotalPrice={totalPrice}
                      key={cartItem.id}
                    />
                  )
                );
              })}
            </div>

            <div className="mt-[80px] flex flex-col content-end">
              <div className="mb-[30px]">
                <p className="text-right text-[16px] font-bold mr-1">
                  총 결제금액<p className="text-[24px] font-bold inline-block ml-1"> {total}원</p>
                </p>
              </div>

              <button className="w-[244px] h-[50px] bg-point text-white rounded-[5px] ml-[80%]">
                <Link href={"/payment"}>결제하기</Link>
              </button>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Section>
    </>
  );
};

export default page;
