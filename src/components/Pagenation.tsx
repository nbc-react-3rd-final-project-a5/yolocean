import { NextPageContext } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
interface Props {
  maxPage: number;
  currentPage: number;
  limit: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  articleName: string;
}

const Pagenation = ({ maxPage, currentPage, limit, setPage, articleName }: Props) => {
  let firstPageNumber = Math.floor((currentPage - 1) / limit) * limit + 1;
  const pathName = usePathname();
  const pageArray = Array.from({ length: Math.min(limit, maxPage) }, (v, i) => firstPageNumber + i);

  return (
    <nav className=" py-[25px]">
      <ul className="flex h-auto items-center text-[14px] cursor-pointer text-tc-light text-sm gap-[30px] w-fit mx-auto">
        {currentPage > 1 && (
          <Link
            href={`#${articleName}`}
            onClick={() => {
              setPage((prev) => Math.max(prev - 1, 1));
            }}
            className="text-black"
          >
            <li>
              <MdKeyboardArrowLeft />
            </li>
          </Link>
        )}

        {pageArray.map((page, index) => (
          <Link
            href={`#${articleName}`}
            onClick={() => setPage(page)}
            key={page}
            className={`${
              currentPage === page && "rounded-full bg-point text-white"
            } w-[24px] h-[24px] p-[5px] flex items-center justify-center`}
          >
            <li>{page}</li>
          </Link>
        ))}

        {currentPage < maxPage && (
          <Link
            onClick={() => setPage((prev) => Math.min(prev + 1, maxPage))}
            href={`#${articleName}`}
            className="text-black"
          >
            <MdKeyboardArrowRight />
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Pagenation;
