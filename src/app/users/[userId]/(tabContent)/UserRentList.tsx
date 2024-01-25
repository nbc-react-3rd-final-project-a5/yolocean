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
              <li key={`rentItem`} className="bg-red-50">
                <RentItem rentData={n} />
              </li>
            );
          })}
        </ul>
      ) : (
        "작성된 리뷰가 없습니다."
      )}
    </div>
  );
};

export default UserRentList;
