import React from "react";
import Image from "next/image";

const Cart = () => {
  return (
    <>
      <div className="border border-gray w-[40%]">
        <div className="flex flex-row">
          <div>
            <Image src="" width={160} height={120} alt="상품대표이미지" />
          </div>
          <div>
            <p>카테고리명</p>
            <p>상품명</p>
            <p>지점</p>
            <p>가격</p>
            <p>수량</p>
          </div>
        </div>
        <div>
          <p>상품금액</p>
          <p>수량 n개</p>
          <p>총금액</p>
        </div>
      </div>
    </>
  );
};

export default Cart;
