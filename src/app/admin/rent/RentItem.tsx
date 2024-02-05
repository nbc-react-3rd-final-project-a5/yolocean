import { AdminRent } from "@/types/db";
import React from "react";
import Image from "next/image";
import dayjs from "dayjs";
import CustomButton from "@/components/CustomButton";
import { useCustomMutation } from "@/hook";
import { updateReturnRent } from "@/service/table";

interface Props {
  rentItem: AdminRent;
}

const RentItem = ({ rentItem }: Props) => {
  const { id, thumbnail, product_name, store_name, userinfo, rent_date, return: isReturn } = rentItem;
  const date = dayjs(rent_date);

  const { mutate: updateReturnMutate } = useCustomMutation({
    mutationFn: async (isReturn: boolean) => updateReturnRent({ rentId: id, body: JSON.stringify(isReturn) }),
    queryKey: ["rent"]
  });

  return (
    <>
      <div className="border rounded-[5px] p-[20px] space-y-[10px] min-w-[800px]">
        <div className="flex flex-row space-x-[10px]">
          <Image src={thumbnail} width={50} height={50} alt="상품이미지" />
          <p className="py-[16px] ">{product_name}</p>
        </div>
        <div className="grid grid-cols-5 gap-3 max-w-[600px] text-[14px]">
          <p className="text-end  p-1.5">렌트지점</p>
          <p className="col-span-4 border p-1.5"> {store_name}</p>

          <p className="text-end  p-1.5">렌트날짜</p>
          <p className="col-span-4 border p-1.5"> {date.format("YYYY-MM-DD")}</p>

          <p className="text-end  p-1.5">고객 아이디</p>
          <p className="col-span-4 border p-1.5"> {userinfo.email}</p>

          <p className="text-end  p-1.5">고객 이름</p>
          <p className="col-span-4 border p-1.5"> {userinfo.username}</p>

          <p className="text-end  p-1.5">고객 연락처</p>
          <p className="col-span-4 border p-1.5"> {userinfo.phone ?? "소셜로그인 유저"}</p>
        </div>
        <div className="flex justify-end">
          {!isReturn ? (
            <CustomButton size="sm" onClick={() => updateReturnMutate(true)}>
              반납처리하기
            </CustomButton>
          ) : (
            <CustomButton size="sm" className="bg-tc-light border-tc-light" onClick={() => updateReturnMutate(false)}>
              반납취소하기
            </CustomButton>
          )}
        </div>
      </div>
    </>
  );
};

export default RentItem;
