"use client";
import { updateProduct } from "@/service/table";
import React, { useEffect } from "react";
interface Props {
  product: any;
}

const View = ({ product }: Props) => {
  useEffect(() => {
    const visitProduct = sessionStorage.getItem(product.id);
    if (visitProduct) return;
    sessionStorage.setItem(product.id, product.id);
    (async () => {
      await updateProduct({ productId: product.id, body: JSON.stringify({ view: Number(product.view) + 1 }) });
    })();
  }, [product.id, product.view]);

  return null;
};

export default View;

// 조회수를 구현하려고하는데 상품페이지 자체는 서버클라이언트입니다.
// 상품페이지에 들어오면 view컴포넌트(클라이언트)에서 props로 상품정보를 받아
// 세션스토리지에 상품 id가 저장되고 조회수를 기존조회수 +1을 해줍니다.
// 만약 아이디가 있다면 아무일도 일어나지않습니다.

// 문제는 서버컴포넌트에서 받아온 상품정보의 view가 1이라는점입니다.
