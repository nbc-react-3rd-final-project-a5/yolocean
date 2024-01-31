import React, { Suspense } from "react";
import RentItem from "./RentItem";
import { getAllUserRent } from "@/service/table";
import UserRentPulse from "@/components/pulse/UserRentPulse";
import { useSearchParams } from "next/navigation";
import Pagenation from "@/components/Pagenation";
import Link from "next/link";

interface Props {
  userId: string;
  article: string;
  page: number;
}

// 예약내역 탭
const UserReservationList = async ({ userId, article, page }: Props) => {
  const data = await getAllUserRent({ userId, isReturn: false, page });
  const { rent: rentList, maxPage, nextPage, prevPage } = data;

  // const pageProps = {
  //   articleName: article,
  //   setPage,
  //   maxPage,
  //   currentPage: page,
  //   limit: 5
  // };

  return (
    <>
      {rentList.length === 0 ? (
        <div className="w-full text-center text-[18px] font-semibold"> 예약 내역이 없습니다 😅</div>
      ) : (
        rentList.map((n: any) => {
          return (
            <div key={n.id} className="first:border-t border-t border-b border-line py-5">
              <RentItem rentData={n} isReturn={false} />
            </div>
          );
        })
      )}

      <div>
        <Link href={"http://localhost:3000/users/7ddac094-5da5-4626-b0bc-49bbaae264ab#tab"}>1페이지</Link>
        <Link href={"http://localhost:3000/users/7ddac094-5da5-4626-b0bc-49bbaae264ab?page=2#tab"}>2페이지</Link>
        <Link href={"http://localhost:3000/users/7ddac094-5da5-4626-b0bc-49bbaae264ab?page=3#tab"}>3페이지</Link>
      </div>
    </>
  );
};

export default UserReservationList;
