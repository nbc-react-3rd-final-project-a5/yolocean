import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CartBox } from "@/types/db";
import { VscChromeClose } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import NumberInput from "@/components/NumberInput";
import { useCustomMutation } from "@/hook";
import { deleteCart, updateCart } from "@/service/table";

interface Props {
  cart: CartBox;
  cartPrice: number[];
  setCartPrice: React.Dispatch<React.SetStateAction<number[]>>;
  idx: number;
  originPrice: number[];
  setOriginPrice: React.Dispatch<React.SetStateAction<number[]>>;
}

const CartItem = (cart: Props) => {
  const { count, id, product_id, store_id, user_id, rent_date, store, product } = cart.cart;
  const { name, thumbnail, price, percentage_off, category } = product;
  const { cartPrice, setCartPrice, idx, originPrice, setOriginPrice } = cart;

  const finalPrice = price * (1 - percentage_off * 0.01);

  const [isVisible, setIsVisible] = useState(true);

  const { mutate: updateCountMutation } = useCustomMutation({
    mutationFn: async () =>
      await updateCart({ userId: user_id, cartId: id, body: JSON.stringify({ count: watchCount.count }) }),
    queryKey: ["cart"]
  });
  const { mutate: deleteCartMutation } = useCustomMutation({
    mutationFn: async () => await deleteCart({ userId: user_id, cartId: id }),
    queryKey: ["cart"]
  });

  const {
    register,
    setValue,
    getValues,
    watch,
    formState: { errors },
    clearErrors
  } = useForm({ mode: "onChange" });
  const watchCount = watch();

  useEffect(() => {
    const updateCount = async () => {
      if (isVisible) {
        originPrice[idx] = getValues("count") * price;
        setOriginPrice([...originPrice]);
        cartPrice[idx] = getValues("count") * finalPrice;
        setCartPrice([...cartPrice]);
        updateCountMutation({});
      } else {
        //삭제했을 때
        originPrice[idx] = 0;
        setOriginPrice([...originPrice]);
        cartPrice[idx] = 0;
        setCartPrice([...cartPrice]);
      }
    };
    updateCount();
  }, [watchCount.count, isVisible]);

  const handleCartDelete = () => {
    setIsVisible(false);
    deleteCartMutation({});
  };

  return (
    <>
      <div className={isVisible ? "border-y border-gray w-[100%] py-5 mobile:py-3" : "hidden"}>
        <VscChromeClose
          onClick={handleCartDelete}
          className="ml-[98%] cursor-pointer mobile:ml-[92%]"
          color="#595959"
        />
        <div className="flex flex-row my-2">
          <div className="mx-5 w-[190px] h-[190px] relative">
            <Image src={thumbnail} fill style={{ objectFit: "contain" }} alt="상품대표이미지" />
          </div>
          <div className="mx-3">
            <div className="mb-[20px]">
              <p className="font-semibold text-[16px] text-point mobile:text-[14px]">{rent_date}</p>
            </div>
            <div className="mb-[10px]">
              <p className="text-[15px]  text-tc-light mobile:text-[13px]">{category.category_name}</p>
            </div>
            <div className="mb-[15px]">
              <p className="text-[16px] font-medium mobile:text-[14px]">{name}</p>
            </div>
            <div className="mb-[15px]">
              <p className="text-[16px] font-medium mobile:text-[14px]">{store.name}</p>
            </div>
            <div className="mb-[13px]">
              <p className="text-[16px] font-medium mobile:text-[14px]">{finalPrice.toLocaleString()}원</p>
            </div>

            <div>
              <NumberInput
                clearErrors={clearErrors}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
                value={count || 1}
                name="count"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mt-[20px] mobile:flex-col mobile:items-end mobile:gap-2">
          <div>
            <p className="text-[16px] font-medium mobile:text-[14px]">
              상품금액 {finalPrice.toLocaleString()}원 / 수량 {getValues("count")}개
            </p>
          </div>
          <p className="font-bold text-[18px] mobile:text-[16px]">
            총금액 {(finalPrice * getValues("count")).toLocaleString()}원
          </p>
        </div>
      </div>
    </>
  );
};

export default CartItem;
