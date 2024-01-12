"use client";
import React from "react";
import Image from "next/image";
import CartItem from "./CartItem";
import { useCart } from "@/hooks";

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
  const { cart, isLoading } = useCart("aba26c49-82c0-42b2-913c-c7676527b553");
  // console.log(cart);
  return (
    <>
      {!isLoading ? (
        <div>
          {(cart as CartBox[]).map((cartItem) => {
            return cartItem && <CartItem cart={cartItem} key={cartItem.id} />;
          })}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default page;
