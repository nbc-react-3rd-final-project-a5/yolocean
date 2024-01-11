import React, { useState } from "react";
import Image from "next/image";
import { Cart } from "@/types/db";

const CartItem = () => {
  const [cnt, setCnt] = useState(1);
  return (
    <>
      <div className="border border-gray w-[40%] p-2">
        <div className="flex flex-row my-2">
          <div className="mx-5 ">
            <Image src="" width={160} height={120} alt="상품대표이미지" />
          </div>
          <div className="mx-3">
            <p>카테고리명</p>
            <p>상품명</p>
            <p>지점</p>
            <p>날짜</p>
            <p>가격</p>
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
          <p>상품금액</p>
          <p>수량 {cnt}개</p>
          <p>총금액</p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
