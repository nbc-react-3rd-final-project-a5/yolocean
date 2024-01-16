"use client";
import React, { useEffect, useState } from "react";
import Section from "@/components/layout/Section";
import CartItem from "./CartItem";
import { useCart } from "@/hooks";
import Link from "next/link";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { useAuth } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import useLogedInStore from "@/store/logedStore";
import { useRouter } from "next/navigation";
import { MdNumbers } from "react-icons/md";

const linkList = [
  {
    name: "홈",
    url: "http://localhost:3000/"
  },
  {
    name: "장바구니",
    url: "http://localhost:3000/cart"
  }
];

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

export interface Object {
  key: string;
  value: number;
}

const page = () => {
  const router = useRouter();

  //로그인 여부 확인
  // const { logedIn } = useLogedInStore();
  // if (!logedIn) {
  //   alert("로그인 후 이용해주세요");
  //   router.push("/");
  // }

  //로그인 유저 정보
  const { getLoginUser } = useAuth();
  const { data: loginUser } = useQuery({
    queryKey: ["loginUser"],
    queryFn: getLoginUser
  });
  const userId = loginUser?.session?.user.id;

  //useCart에 사용자 id 수정 필
  const { cart, isLoading } = useCart({ userId: "aba26c49-82c0-42b2-913c-c7676527b553", cartId: "" });

  const [cartPrice, setCartPrice] = useState<number[]>([]);

  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <Section title={"장바구니"} isCenter={true}>
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

            <div className="mt-[80px] flex flex-col content-end">
              <div className="mb-[30px]">
                <div className="text-right text-[16px] font-bold mr-1">
                  총 결제금액
                  <p className="text-[24px] font-bold inline-block ml-1">
                    {" "}
                    {cartPrice.reduce((acc, num) => acc + num, 0)}원
                  </p>
                </div>
              </div>

              <button
                onClick={() => router.push("/payment")}
                className="w-[244px] h-[50px] bg-point text-white rounded-[5px] ml-[80%]"
              >
                결제하기
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
