import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CartBox } from "./page";
import { VscChromeClose } from "react-icons/vsc";
import { useCart } from "@/hooks";
import { useForm } from "react-hook-form";
import NumberInput from "@/components/NumberInput";

interface Props {
  cart: CartBox;
  total: number;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
  initTotalPrice: number;
}

interface Input {
  count: number;
}

const CartItem = (cart: Props) => {
  const { count, id, product_id, store_id, user_id, rent_date, store, product } = cart.cart;
  const { name, thumbnail, price, percentage_off, category } = product;
  const { total, setTotal, initTotalPrice } = cart;

  const [isVisible, setIsVisible] = useState(true);

  const { updateCountMutation, deleteCart } = useCart({ userId: user_id, cartId: id });

  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors }
  } = useForm({ mode: "onChange" });
  const watchCount = watch();

  useEffect(() => {
    //count가 아니라 이전값 빼줘야함, total price 구하는 로직 수정해야함.
    const updateCount = async () => {
      console.log(total, watchCount.count, getValues("count"));
      if (count !== null) {
        if (isVisible) {
          watchCount.count === count ? setTotal(initTotalPrice) : setTotal(total + (watchCount.count - count) * price);
        } else {
          //삭제했을 때
          setTotal(total + (0 - count) * price);
        }
      }

      updateCountMutation.mutate(watchCount.count);
      console.log("------update!-----", total);
    };
    updateCount();
  }, [watchCount.count, isVisible]);

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
              <NumberInput
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                value={count || 0}
                name="count"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row border-t">
          <p>상품금액{price}원</p>
          <p>수량 {watchCount.count}개</p>
          <p>총금액{price * watchCount.count}원</p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
