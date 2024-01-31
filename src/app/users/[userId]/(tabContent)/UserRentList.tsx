import React from "react";
import RentItem from "./RentItem";
<<<<<<< HEAD
import { getAllUserRent } from "@/service/table";
import Link from "next/link";
=======
import { useSuspenseQuery } from "@tanstack/react-query";
import UserRentPulse from "@/components/pulse/UserRentPulse";
import { useSearchParams } from "next/navigation";
import Pagenation from "@/components/Pagination";
>>>>>>> 578bd5b48770196fc8e8904bd0d886042d45de30

interface Props {
  userId: string;
  article: string;
  page: number;
  isReturn: boolean;
}

// 예약내역 탭
const UserRentList = async ({ userId, article, isReturn, page }: Props) => {
  const data = await getAllUserRent({ userId, isReturn, page });
  const { rent: rentList, maxPage, nextPage, prevPage } = data;

  console.log("==========dfsdfsdfsdf=================");
  console.log(rentList);
  console.log("============sdfsdfdsf===============");

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
              <RentItem rentData={n} isReturn={isReturn} />
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

export default UserRentList;
