"use client";
import React from "react";
import { useCart } from "@/hooks";
import { useAuthStore } from "@/store/authStore";

const Receipt = () => {
  const { auth } = useAuthStore();
  const { cart, isLoading } = useCart({ userId: auth, cartId: "" });
  if (cart !== undefined) {
    console.log(auth, cart);
  }
  return <>{isLoading ? <div>Loading...</div> : <div>테스트페이지</div>}</>;
};

export default Receipt;
