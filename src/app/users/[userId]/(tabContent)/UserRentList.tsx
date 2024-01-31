import React from "react";
import RentItem from "./RentItem";
import { getAllUserRent } from "@/service/table";
import Pagination from "@/components/Pagination";

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

  const pageProps = {
    articleName: article,
    maxPage,
    currentPage: page,
    limit: 5
  };

  return (
    <>
      {rentList.length === 0 ? (
        <div className="w-full text-center text-[18px] font-semibold"> 해당 내역이 없습니다 😅</div>
      ) : (
        rentList.map((n: any) => {
          return (
            <div key={n.id} className="first:border-t border-t border-b border-line py-5">
              <RentItem rentData={n} isReturn={isReturn} />
            </div>
          );
        })
      )}

      <Pagination {...pageProps} />
    </>
  );
};

export default UserRentList;
