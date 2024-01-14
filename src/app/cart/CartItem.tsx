import React, { useEffect, useState } from "react";
import { supabase } from "@/service/supabase";
import Image from "next/image";
import { CartBox } from "./page";
import { VscChromeClose } from "react-icons/vsc";
import { useCart } from "@/hooks";

interface Props {
  cart: CartBox;
}

interface Input {
  count: number;
}

const CartItem = (cart: Props) => {
  const { count, id, product_id, store_id, user_id, rent_date, store, product } = cart.cart;
  const { name, thumbnail, price, percentage_off, category } = product;
  // console.log(product);

  const [isVisible, setIsVisible] = useState(true);

  const { updateCountMutation, deleteCart } = useCart({ userId: user_id, cartId: id });

  //수정필
  const [cnt, setCnt] = useState(count ? count : 0);
  useEffect(() => {
    const updateCount = async () => {
      updateCountMutation.mutate(cnt);
    };
    updateCount();
  }, [cnt, isVisible]);

  const handleCartDelete = () => {
    setIsVisible(false);
    deleteCart(id);
  };

  return (
    <>
      <div className={isVisible ? "border border-gray w-[60%] p-4 mb-5" : "hidden"}>
        <VscChromeClose onClick={handleCartDelete} className="ml-[95%] cursor-pointer" color="gray" />
        <div className="flex flex-row my-2">
          <div className="mx-5 w-[160px] h-[160] relative">
            <Image src={thumbnail} fill style={{ objectFit: "contain" }} alt="상품대표이미지" />
          </div>
          <div className="mx-3">
            <p>{category.category_name}</p>
            <div className="flex flex-row space-x-4 ml-2">
              <p className="border border-gray w-[80px] text-center">상품명</p>
              <p>{name}</p>
            </div>
            <div className="flex flex-row space-x-4 ml-2">
              <p className="border border-gray w-[80px] text-center">지점명</p>
              <p>{store.name}</p>
            </div>
            <div className="flex flex-row space-x-4 ml-2">
              <p className="border border-gray w-[80px] text-center">렌트 날짜</p>
              <p>{rent_date}</p>
            </div>
            <div className="flex flex-row space-x-4 ml-2">
              <p className="border border-gray w-[80px] text-center">상품 가격</p>
              <p>{price}원</p>
            </div>
            <div className="flex flex-row space-x-4 ml-2">
              <label htmlFor="count" className="border border-gray w-[80px] text-center">
                수량
              </label>
              <input
                type="number"
                id="count"
                defaultValue={count || 0}
                min={1}
                onChange={(e) => setCnt(+e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row border-t">
          <p>상품금액{price}원</p>
          <p>수량 {cnt}개</p>
          <p>총금액{price * cnt}원</p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
