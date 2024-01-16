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

const Page = () => {
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
      <Section title={"장바구니"} isCenter={false}>
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

            <div>
              <p>총금액</p>
              <p>{total}원</p>
            </div>

            <Link href={"/payment"}>결제하기</Link>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </Section>
    </>
  );
};

export default Page;
