"use client";

import Pagenation from "@/components/Pagenation";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  maxPage: number;
}

const UserPagenation = ({ maxPage }: Props) => {
  const router = useRouter();
  const { pathname } = window.location;
  const searchParams = useSearchParams();
  const article = searchParams.get("article") || "예약내역";

  const currentPage = Number(searchParams.get("page") || 1);

  const setPage = (changePage: number) => {
    const url = `/${pathname}?article=${article}&page=${changePage}`;
    return router.push(url);
  };
  return (
    <>
      {/* <Pagenation
        articleName={article}
        currentPage={currentPage}
        setPage={setPage}
        maxPage={maxPage}
        limit={5}
      ></Pagenation> */}
    </>
  );
};

export default UserPagenation;
