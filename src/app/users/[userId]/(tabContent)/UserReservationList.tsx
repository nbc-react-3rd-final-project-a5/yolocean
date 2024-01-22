import React from "react";
import getPath from "@/utils/getPath";
import RentItem from "./RentItem";

interface Props {
  userId: string;
}

const getReservationList = async (domain: string, userId: string) => {
  const res = await fetch(`http://${domain}/api/rent/${userId}`, { method: "GET" });
  const data = await res.json();
  console.log(data);
  return data;
};

const UserReservationList = async ({ userId }: Props) => {
  const { domain } = getPath();
  const reservationList = await getReservationList(domain, userId);
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
