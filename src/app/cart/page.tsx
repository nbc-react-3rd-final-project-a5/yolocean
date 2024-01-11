"use client";
import React, { useState } from "react";
import Image from "next/image";
// import CartItem from "./CartItem";

import useCart from "@/hooks/useCart";

interface CartBox {
  cart: {
    count: number | null;
    id: string;
    product_id: string | null;
    store_id: string | null;
    user_id: string;
    product: {
      name: string;
      thumbnail: string;
    };
  };
  store: {
    name: string;
  };
  product: {
    name: string;
    thumbnail: string;
    price: number;
    percentage_off: number;
    category: {
      category_name: string;
    };
  };
}

// const CartItem = ({ cart, product, store }: Props) => {
const CartItem = (cart: CartBox) => {
  const { count, id, product_id, store_id, user_id, store, product } = cart.cart;
  const { name: product_name, thumbnail, price, percentage_off, category } = product;
  console.log(price);

  //수정필
  const [cnt, setCnt] = useState(count || 0);
  return (
    <>
      <div className="border border-gray w-[60%] p-2">
        <div className="flex flex-row my-2">
          <div className="mx-5 ">
            <Image src={thumbnail} width={160} height={120} alt="상품대표이미지" />
          </div>
          <div className="mx-3">
            <p>{category.category_name}</p>
            <p>{store.name}</p>
            <p>날짜</p>
            <p>{price}원</p>
            <div className="flex flex-row">
              <button onClick={() => setCnt(cnt - 1)} className="bg-gray-300  w-[25px] h-[25px]">
                -
              </button>

              <p className="w-[25px] h-[25px] text-center border border-gray-300">{cnt}</p>
              <button onClick={() => setCnt(cnt + 1)} className="bg-gray-300  w-[25px] h-[25px]">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row border-t">
          <p>상품금액{price}원</p>
          <p>수량 {cnt}개</p>
          <p>총금액{cnt * price}원</p>
        </div>
      </div>
    </>
  );
};

const page = () => {
  //useCart에 사용자 id
  const { cart, isLoading } = useCart("aba26c49-82c0-42b2-913c-c7676527b553");
  // console.log(cart);
  return (
    <>
      {!isLoading ? (
        <div>
          {(cart as CartBox[]).map((cartItem) => {
            // console.log("cartItem:", cartItem);
            return cartItem && <CartItem cart={cartItem} key={cartItem!.id} />;
            // <CartItem cart={cartItem.cart} store={cartItem.store} product={cartItem.product} />
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default page;
