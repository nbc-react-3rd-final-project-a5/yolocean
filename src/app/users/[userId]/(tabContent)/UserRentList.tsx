import { getAllUserRent } from "@/service/table";
import React from "react";
import RentItem from "./RentItem";

interface Props {
  userId: string;
}

// TODO : 테이블 리턴 값이 true 인 상품을 가져올 수 있도록 API 설정할 것
const UserRentList = async ({ userId }: Props) => {
  const reservationList = await getAllUserRent({ userId });
  return (
    <div>
      {reservationList?.length > 0 ? (
        <ul>
          {reservationList.map((n: any) => {
            return (
              <li key={`rentItem`} className="first:border-t border-t border-b border-line py-5">
                <RentItem rentData={n} isReturn={true} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="w-full text-center text-[18px] font-semibold"> 렌트 내역이 없습니다 😅</div>
      )}
    </div>
  );
};

export default UserRentList;
