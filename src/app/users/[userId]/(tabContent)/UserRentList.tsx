"use client";

import { getAllUserRent } from "@/service/table";
import React, { Suspense, useEffect, useState } from "react";
import RentItem from "./RentItem";
import { useSuspenseQuery } from "@tanstack/react-query";
import UserRentPulse from "@/components/pulse/UserRentPulse";
import { useSearchParams } from "next/navigation";
import Pagenation from "@/components/Pagenation";

interface Props {
  userId: string;
  article: string;
}
// 렌트 완료 탭
const UserRentList = ({ userId, article }: Props) => {
  const [page, setPage] = useState<number>(1);

  const { data, isLoading, refetch } = useSuspenseQuery({
    queryKey: ["user", "rent"],
    queryFn: async () => getAllUserRent({ userId, isReturn: true })
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
                    <RentItem rentData={n} isReturn={true} />
                  </li>
                );
              })}
            </ul>
            <Pagenation {...pageProps} />
          </>
        ) : (
          <div className="w-full text-center text-[18px] font-semibold"> 렌트 완료된 내역이 없습니다 😅</div>
        )}
      </Suspense>
    </>
  );
};

export default UserRentList;
