"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
interface Props {
  maxPage: number;
  currentPage: number;
  limit: number;
  articleName: string;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ maxPage, currentPage, limit, articleName, setPage }: Props) => {
  let firstPageNumber = Math.floor((Number(currentPage) - 1) / limit) * limit + 1;

  const pathName = usePathname();
  const pageArray = Array.from({ length: Math.min(limit, maxPage) }, (v, i) => firstPageNumber + i);

  return (
    <nav className=" py-[25px]">
      <ul className="flex h-auto items-center text-[14px] cursor-pointer text-tc-light text-sm gap-[30px] w-fit mx-auto">
        {currentPage > 1 && (
          <Link
            scroll={false}
            href={{ href: pathName, query: { article: articleName, page: Number(currentPage) - 1 } }}
            onClick={() => {
              document?.getElementById("tab")?.scrollIntoView({ behavior: "smooth" });
              if (setPage) {
                setPage((currentPage) => Number(currentPage) - 1);
              }
            }}
            className="text-black"
            aria-label="이전 페이지로 이동"
          >
            <li>
              <MdKeyboardArrowLeft />
            </li>
          </Link>
        )}

        {pageArray.map((page, index) => {
          return (
            <Link
              scroll={false}
              href={{ href: pathName, query: { article: articleName, page } }}
              onClick={() => {
                document?.getElementById("tab")?.scrollIntoView({ behavior: "smooth" });
                if (setPage) {
                  setPage(page);
                }
              }}
              key={page}
              className={`${
                Number(currentPage) === Number(page) && "rounded-full bg-point text-white"
              } w-[24px] h-[24px] p-[5px] flex items-center justify-center`}
              aria-label={`${page} 페이지로 이동`}
            >
              <li>{page}</li>
            </Link>
          );
        })}

        {currentPage < maxPage && (
          <Link
            scroll={false}
            href={{ href: pathName, query: { article: articleName, page: Number(currentPage) + 1 } }}
            onClick={() => {
              document?.getElementById("tab")?.scrollIntoView({ behavior: "smooth" });
              if (setPage) {
                setPage((currentPage) => Number(currentPage) + 1);
              }
            }}
            className="text-black"
            aria-label="다음 페이지로 이동"
          >
            <MdKeyboardArrowRight />
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
