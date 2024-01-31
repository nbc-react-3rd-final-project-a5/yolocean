"use client";

import React, { Suspense, useEffect, useState } from "react";
import RentItem from "./RentItem";
import { getAllUserRent } from "@/service/table";
import { useSuspenseQuery } from "@tanstack/react-query";
import UserRentPulse from "@/components/pulse/UserRentPulse";
import { useSearchParams } from "next/navigation";
import Pagenation from "@/components/Pagination";

interface Props {
  userId: string;
  article: string;
}

// 예약내역 탭
const UserReservationList = ({ userId, article }: Props) => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useSuspenseQuery({
    queryKey: ["user", "reservation"],
    queryFn: async () => getAllUserRent({ userId, isReturn: false })
  });

  const { rent: rentList, maxPage } = data;

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const pageProps = {
    articleName: article,
    setPage,
    maxPage,
    currentPage: page,
    limit: 5
  };

  return (
    <>
      <Suspense fallback={<UserRentPulse />}>
        {rentList?.length > 0 ? (
          <>
            <ul>
              {rentList.map((n: any) => {
                return (
                  <li key={n.id} className="first:border-t border-t border-b border-line py-5">
                    <RentItem rentData={n} isReturn={false} />
                  </li>
                );
              })}
            </ul>
            <Pagenation {...pageProps} />
          </>
        ) : (
          <div className="w-full text-center text-[18px] font-semibold"> 예약 내역이 없습니다 😅</div>
        )}
      </Suspense>
    </>
  );
};

export default UserReservationList;
