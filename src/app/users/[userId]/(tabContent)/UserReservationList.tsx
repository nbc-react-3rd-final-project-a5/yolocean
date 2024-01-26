import React from "react";
import RentItem from "./RentItem";
import { getAllUserRent } from "@/service/table";

interface Props {
  userId: string;
}

const UserReservationList = async ({ userId }: Props) => {
  const reservationList = await getAllUserRent({ userId });
  return (
    <div>
      {reservationList?.length > 0 ? (
        <ul>
          {reservationList.map((n: any) => {
            return (
              <li key={`rentItem`} className="first:border-t border-t border-b border-line py-5">
                <RentItem rentData={n} isReturn={false} />
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="w-full text-center text-[18px] font-semibold"> 예약 내역이 없습니다 😅</div>
      )}
    </div>
  );
};

export default UserReservationList;
