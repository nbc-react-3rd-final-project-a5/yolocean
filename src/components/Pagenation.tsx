import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface Props {
  maxPage: number;
  currentPage: number;
  limit: number;
}

const Pagenation = ({ maxPage, currentPage, limit }: Props) => {
  let firstPageNumber = Math.floor((currentPage - 1) / limit) * limit + 1;
  const pathName = usePathname();
  const pageArray = Array.from({ length: Math.min(limit, maxPage) }, (v, i) => firstPageNumber + i);

  return (
    <nav>
      <ul className="flex h-auto items-center text-[14px] cursor-pointer text-tc-light text-sm gap-[30px] w-fit mx-auto">
        {currentPage > 1 && (
          <Link href={`${pathName}?page=${Math.max(currentPage - 1, 1)}#제품문의`} className="text-black">
            <MdKeyboardArrowLeft />
          </Link>
        )}

        {pageArray.map((page, index) => (
          <Link
            href={`${pathName}?page=${page}#제품문의`}
            key={page}
            className={`${
              currentPage === page && "rounded-full bg-point text-white"
            } w-[24px] h-[24px] p-[5px] flex items-center justify-center`}
          >
            {page}
          </Link>
        ))}

        {currentPage < maxPage && (
          <Link href={`${pathName}?page=${Math.min(currentPage + 1, maxPage)}#제품문의`} className="text-black">
            <MdKeyboardArrowRight />
          </Link>
        )}
      </ul>
    </nav>
  );
};

export default Pagenation;
