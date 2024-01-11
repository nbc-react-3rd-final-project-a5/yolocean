import React, { useState } from "react";
import Image from "next/image";
import { CartBox } from "./page";
import { VscChromeClose } from "react-icons/vsc";

interface Props {
  cart: CartBox;
}

const CartItem = (cart: Props) => {
  const { count, id, product_id, store_id, user_id, store, product } = cart.cart;
  const { name, thumbnail, price, percentage_off, category } = product;
  // console.log(product);

  //수정필
  const [cnt, setCnt] = useState(count ? count : 0);
  return (
    <>
      <div className="border border-gray w-[60%] p-4 mb-5">
        <VscChromeClose className="ml-[95%] cursor-pointer" color="gray" />
        <div className="flex flex-row my-2">
          <div className="mx-5 ">
            <Image src={thumbnail} width={160} height={120} alt="상품대표이미지" />
          </div>
          <div className="mx-3">
            <p>{category.category_name}</p>
            <p>{name}</p>
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

export default CartItem;
