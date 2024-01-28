"use client";

import React from "react";
import RentItem from "./RentItem";
import { getAllUserRent } from "@/service/table";
import { useQuery } from "@tanstack/react-query";
import UserRentPulse from "@/components/pulse/UserRentPulse";

interface Props {
  userId: string;
}

// 예약내역 탭
const UserReservationList = ({ userId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["reservation", userId],
    queryFn: async () => getAllUserRent({ userId })
  });

  if (isLoading)
    return (
      <ul>
        <li className="first:border-t border-t border-b border-line py-5">
          <UserRentPulse />
        </li>
      </ul>
    );

  return (
    <>
      {data?.length > 0 ? (
        <ul>
          {data.map((n: any) => {
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
    </>
  );
};

export default UserReservationList;
