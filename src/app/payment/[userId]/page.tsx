"use client";
import React, { useEffect, useState } from "react";
import CartItem from "@/app/cart/CartItem";
import { CartBox, RentLogInsert } from "@/types/db";
import { UserInfo } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import { createAllUserRent, deleteAllCart, getAllCart, getUser } from "@/service/table";
import { useCustomMutation } from "@/hook";
import Section from "@/components/layout/Section";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import { useForm } from "react-hook-form";
import { createPayment } from "@/lib/portone";
import { usealertStore } from "@/store/alertStore";
import { useModalStore } from "@/store/modalStore";
import { openConfirm } from "@/store/confirmStore";
import { useRouter } from "next/navigation";
import SuccessModal from "./SuccessModal";
import CartPulse from "@/components/pulse/CartPulse";
import CustomButton from "@/components/CustomButton";

const linkList = [
  {
    name: "홈",
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}`
  },
  {
    name: "장바구니",
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/cart`
  },
  {
    name: "주문서",
    url: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/payment`
  }
];

const PaymentPage = ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => await getAllCart({ userId })
  });
  const { mutate: deleteUserCartMutation } = useCustomMutation({
    mutationFn: async () => await deleteAllCart({ userId: userId }),
    queryKey: ["cart"]
  });
  const shop = cart !== undefined ? (cart.length > 0 ? cart[0].store.name : "no-shop") : "no-shop";

  //전체 동의 클릭 시
  const allAgree = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setValue(`fullTerms`, true);
      setValue(`protection`, true);
      setValue(`useTerms`, true);
    } else {
      setValue(`fullTerms`, false);
      setValue(`protection`, false);
      setValue(`useTerms`, false);
    }
  };
  //약관 동의
  const agree = (e: React.FormEvent<HTMLInputElement>, target: string) => {
    if (e.currentTarget.checked) {
      setValue(target, true);
    } else {
      setValue(`fullTerms`, false);
      setValue(target, false);
    }
  };

  //상품별 총금액(할인적용)
  const [cartPrice, setCartPrice] = useState<number[]>([]);
  const [originPrice, setOriginPrice] = useState<number[]>([]);
  let discountedPrice = cartPrice.reduce((acc, num) => acc + num, 0); //햘인 가격
  let salePrice = originPrice.reduce((acc, num) => acc + num, 0); //비할인 가격

  const { data: user, isLoading: isUserDataLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => await getUser({ userId })
  });

  // === 결제 관련 ===
  const { alertFire } = usealertStore();
  const { openModal } = useModalStore();
  const {
    register,
    formState: { isValid },
    setValue
  } = useForm({ mode: "onBlur" });

  const router = useRouter();

  //rentlog db형식에 맞게
  const setRentData = (cart: CartBox[]) => {
    const rentData: RentLogInsert[] = cart.map((cartItem) => {
      let rentItem: RentLogInsert = {
        category_name: cartItem.product.category.category_name,
        count: cartItem.count!!,
        paid_price: cartItem.product.price * (1 - cartItem.product.percentage_off * 0.01),
        product_id: cartItem.product_id,
        product_name: cartItem.product.name,
        rent_date: cartItem.rent_date,
        store_id: cartItem.store_id,
        store_name: cartItem.store.name,
        thumbnail: cartItem.product.thumbnail,
        user_id: cartItem.user_id
      };
      return rentItem;
    });
    return rentData;
  };

  //rent data upload
  const insertRentData = async () => {
    if (cart !== undefined) {
      const rentData = setRentData(cart);
      createAllUserRent({ userId, body: JSON.stringify(rentData) })
        .then((res) => {
          deleteUserCartMutation({});
        })
        .then(() => {
          openModal(<SuccessModal rentData={rentData} />);
        })
        .catch((error) => console.error(error));
    }
  };

  // 결제하기 버튼 핸들러
  const handlePaymentClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!user?.phone) return alertFire("회원 전화번호 입력 에러", "error");
    const { isPass, msg } = await createPayment({ amount: discountedPrice, buyer_tel: user?.phone || "01012341234" });

    if (isPass) {
      // 결제 성공 후 진행할 로직
      insertRentData();
    } else {
      // 결제 실패 시 진행할 로직
      alertFire(msg, "error");
    }
  };

  // 취소하기 버튼 핸들러
  const handleCancelClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const result: boolean = await openConfirm("결제 취소", "결제를 취소하시겠습니까?");
    result && router.push(`/cart/${userId}`);
  };

  return (
    <>
      <PageBreadCrumb linkList={linkList} />
      <Section title={"주문서"} isCenter={true}>
        {!isLoading && cart !== undefined ? (
          cart.length > 0 ? (
            <>
              <div className="mb-[120px] mobile:mb-[60px]">
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
              </div>
              <form action="">
                <div className="mobile:text-[14px]">
                  <div className="border-black border-b">
                    <h2 className="mb-4 font-bold text-[20px] mobile:text-[18px]">렌탈 약관동의</h2>
                  </div>

                  <div className="p-7 border-b text-tc-middle mobile:p-4">
                    <input
                      id="fullTerms"
                      type="checkbox"
                      {...register("fullTerms")}
                      required
                      className="w-4 h-4 mr-[20px] mobile:mr-[10px] mobile:w-3"
                      onClick={allAgree}
                    />
                    <label htmlFor="fullTerms">전체 약관 동의</label>
                  </div>
                  <div className="p-7 border-b text-tc-middle flex justify-between mobile:p-4">
                    <div>
                      <input
                        id="protection"
                        type="checkbox"
                        {...register("protection", { required: "필수체크 사항입니다." })}
                        className="w-4 h-4 mr-[20px] mobile:mr-[10px] mobile:w-3"
                        onClick={(e) => agree(e, `protection`)}
                      />
                      <label htmlFor="protection">개인 정보 보호를 위한 이용자 동의 (필수)</label>
                    </div>
                    <p className="text-[14px] font-medium text-tc-light text underline cursor-pointer mobile:text-[10px] mobile:py-1.5">
                      내역보기
                    </p>
                  </div>
                  <div className="p-7 border-b text-tc-middle flex justify-between mobile:p-4">
                    <div>
                      <input
                        id="useTerms"
                        type="checkbox"
                        {...register("useTerms", { required: "필수체크 사항입니다." })}
                        required
                        className="w-4 h-4 mr-[20px] mobile:mr-[10px] mobile:w-3"
                        onClick={(e) => agree(e, `useTerms`)}
                      />
                      <label htmlFor="useTerms">렌트 상품 이용약관 동의 (필수)</label>
                    </div>
                    <p className="text-[14px] font-medium text-tc-light text underline cursor-pointer mobile:text-[10px] mobile:py-1.5">
                      내역보기
                    </p>
                  </div>
                </div>
                <div className="mt-[60px] text-tc-middle">
                  <div className="border-black border-b mt-[60px] ">
                    <h2 className="mb-4 font-bold text-[20px] text-black mobile:text-[18px]">신청인 정보</h2>
                  </div>
                  <div className="grid place-items-baseline my-[30px] gap-[15px] mobile:grid-cols-7">
                    <p className=" text-[16px] font-medium mobile:text-[14px] mobile:col-span-2">신청인</p>
                    <p className="col-span-7 w-[100%] p-[15px]  border mobile:col-span-5 mobile:w-[100%] mobile:p-[10px] mobile:text-[13px]">
                      {user?.username}
                    </p>

                    <p className=" text-[16px] font-medium mobile:text-[14px] mobile:col-span-2">이메일</p>
                    <p className="col-span-7 w-[100%] p-[15px]  border mobile:col-span-5 mobile:w-[100%] mobile:p-[10px] mobile:text-[13px]">
                      {user?.email}
                    </p>

                    <p className=" text-[16px] font-medium mobile:text-[14px] mobile:col-span-2">휴대폰 번호</p>
                    <p className="col-span-7 w-[100%] p-[15px]  border mobile:col-span-5 mobile:w-[100%] mobile:p-[10px] mobile:text-[13px]">
                      {user?.phone}
                    </p>

                    <p className=" text-[16px] font-medium mobile:text-[14px] mobile:col-span-2">수령지점</p>
                    <p className="col-span-7 w-[100%] p-[15px]  border mobile:col-span-5 mobile:w-[100%] mobile:p-[10px] mobile:text-[13px]">
                      {shop}
                    </p>
                  </div>
                </div>
                <div className="flex border-black border-y justify-between">
                  <div className="">
                    <h2 className="mt-[30px] font-bold text-[20px] text-black mobile:text-[16px]">총 주문금액</h2>
                  </div>
                  <div className="mt-[30px] w-[30%] text-[16px] font-medium text-tc-middle mobile:w-[60%]">
                    <div className=" border-b mobile:text-[14px]">
                      <div className="flex justify-between mb-[20px]">
                        <p>주문 금액</p>
                        <p>{salePrice}원</p>
                      </div>
                      <div className="flex justify-between  mb-[30px]">
                        <p>할인 금액</p>
                        <p>-{salePrice - discountedPrice}원</p>
                      </div>
                    </div>
                    <div className="flex justify-between my-[30px]">
                      <p className="text-black text-[20px] font-bold mobile:text-[18px]">최종 결제금액</p>
                      <p className="text-point text-[24px] font-bold mobile:text-[20px]">{discountedPrice}원</p>
                    </div>
                  </div>
                </div>
                <div className="flex mt-[22px] mb-[100px] text-[14px] font-medium text-tc-light mobile:mb-[50px]">
                  <input
                    id="payAgree"
                    type="checkbox"
                    {...register("payAgree", { required: "필수체크 사항입니다." })}
                    className="w-4 h-4 mr-[20px] mobile:w-3 mobile:mr-[10px]"
                  />
                  <div>
                    <label htmlFor="payAgree" className="mobile:text-[10px]">
                      렌탈을 진행하실 제품, 신청인 정보, 할인 내역 등을 최종 확인하였으며, 결제에
                      동의하시겠습니까?(전자상거래법 제8조 제2항)
                    </label>
                  </div>
                </div>
              </form>
              <p className="text-center mb-[10px] text-red-500 font-medium">
                결제하기 클릭 시 결제 모듈이 동작하지만 실제로 결제되지 않습니다.
              </p>

              <div className="flex items-center justify-center gap-[12px] mobile:flex-wrap">
                <CustomButton onClick={handlePaymentClick} size="lg" disabled={!isValid} type="button">
                  결제하기
                </CustomButton>
                <CustomButton onClick={handleCancelClick} size="lg" color="gray">
                  취소하기
                </CustomButton>
              </div>
            </>
          ) : (
            <div>카트가 비어있습니다</div>
          )
        ) : (
          <CartPulse />
        )}
      </Section>
    </>
  );
};

export default PaymentPage;
