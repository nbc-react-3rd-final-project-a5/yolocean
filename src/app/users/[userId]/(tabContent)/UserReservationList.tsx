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

export default UserReservationList;
