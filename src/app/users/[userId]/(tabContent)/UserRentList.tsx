"use client";

import { getAllUserRent } from "@/service/table";
import React from "react";
import RentItem from "./RentItem";
import { useQuery } from "@tanstack/react-query";
import UserRentPulse from "@/components/pulse/UserRentPulse";

interface Props {
  userId: string;
}
// 렌트 완료 탭
// TODO : 테이블 리턴 값이 true 인 상품을 가져올 수 있도록 API 설정할 것
const UserRentList = ({ userId }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ["rent", userId],
    queryFn: async () => getAllUserRent({ userId })
  });

  if (isLoading)
    return (
      <>
        <ul>
          <li className="first:border-t border-t border-b border-line py-5">
            <UserRentPulse />
          </li>
        </ul>
      </>
    );

  return (
    <>
      {data?.length > 0 ? (
        <ul>
          {data.map((n: any) => {
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
    </>
  );
};

export default UserRentList;
