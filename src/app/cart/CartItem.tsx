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
      <div className={isVisible ? "border-y border-gray w-[100%] py-5" : "hidden"}>
        <VscChromeClose onClick={handleCartDelete} className="ml-[98%] cursor-pointer" color="#595959" />
        <div className="flex flex-row my-2">
          <div className="mx-5 w-[190px] h-[190px] relative">
            <Image src={thumbnail} fill style={{ objectFit: "contain" }} alt="상품대표이미지" />
          </div>
          <div className="mx-3">
            <div className="mb-[20px]">
              <p className="font-semibold text-[16px] text-point">{rent_date}</p>
            </div>
            <div className="mb-[10px]">
              <p className="text-[15px]  text-tc-light">{category.category_name}</p>
            </div>
            <div className="mb-[15px]">
              <p className="text-[16px] font-medium ">{name}</p>
            </div>
            <div className="mb-[15px]">
              <p className="text-[16px] font-medium ">{store.name}</p>
            </div>
            <div className="mb-[13px]">
              <p className="text-[16px] font-medium ">{price}원</p>
            </div>

            <div>
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
        <div className="flex flex-row justify-between mt-[20px]">
          <div>
            <p className="text-[16px] font-medium ">
              상품금액 {price}원 / 수량 {watchCount.count}개
            </p>
          </div>
          <p className="font-bold text-[18px] ">총금액 {price * watchCount.count}원</p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
