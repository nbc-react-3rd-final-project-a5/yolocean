"use client";
import React, { useState } from "react";
import Section from "@/components/layout/Section";
import CartItem from "../CartItem";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { CartBox } from "@/types/db";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAllCart } from "@/service/table";

const linkList = [
  {
    name: "홈",
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`
  },
  {
    name: "장바구니",
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/cart`
  }
];

const CartPage = ({ params }: { params: { userId: string } }) => {
  const router = useRouter();

  //userId
  const userId = params.userId;
  console.log(userId, "내 아디");

  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => await getAllCart({ userId })
  });

  console.log(cart, "카아트");
  const [cartPrice, setCartPrice] = useState<number[]>([]);
  const [originPrice, setOriginPrice] = useState<number[]>([]);

  //로그인 했는지 ▷ 로딩중인지 ▷ 카트가 불러와졌는지 ▷ 카트가 비어있는지
  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <Section title={"장바구니"} isCenter={true}>
        {!isLoading ? (
          cart !== undefined ? (
            cart.length !== 0 ? (
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

                <div className="mt-[80px] flex flex-col content-end">
                  <div className="mb-[30px]">
                    <div className="text-right text-[16px] font-bold mr-1">
                      총 결제금액
                      <p className="text-[24px] font-bold inline-block ml-1">
                        {" "}
                        {cartPrice.reduce((acc, num) => acc + num, 0).toLocaleString()}원
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/payment/${userId}`)}
                    className="w-[244px] h-[50px] bg-point text-white rounded-[5px] ml-[80%]"
                  >
                    결제하기
                  </button>
                </div>
              </div>
            ) : (
              <div>카트가 비어있습니다</div>
            )
          ) : (
            <div>카트 불러오는 중...</div>
          )
        ) : (
          <div>Loading...</div>
        )}
      </Section>
    </>
  );
};

export default CartPage;
