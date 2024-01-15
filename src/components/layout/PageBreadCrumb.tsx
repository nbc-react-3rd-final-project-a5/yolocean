import Link from "next/link";
import React from "react";
import { BsChevronCompactRight } from "react-icons/bs";

interface Props {
  linkList: {
    name: string;
    url: string;
  }[];
  /**
   * ex) pb-[46px] 처럼 tailwind class 로 작성
   */
  marginBottom?: string;
}

// const testlinkList = [
//   {
//     name: "홈",
//     url: "http://localhost:3000/"
//   },
//   {
//     name: "마이페이지",
//     url: "http://localhost:3000/"
//   },
//   {
//     name: "결제내역",
//     url: "http://localhost:3000/"
//   }
// ];

const PageBreadCrumb = ({ linkList, marginBottom = "pb-[46px]" }: Props) => {
  return (
    <nav
      className={`mt-[20px] text-[14px] leading-none text-[#595959] border-t-[1px] border-[#E5E5E5] pt-[20px]  ${marginBottom}`}
    >
      <ul className="flex flex-row gap-[10px]">
        {linkList.map((n, i) => {
          const isLastLink = i === linkList.length - 1;
          return (
            <>
              <li key={n.url} className={`${isLastLink && "text-[#262626]"} hover:underline`}>
                <Link href={n.url}>{n.name}</Link>
              </li>
              {!isLastLink && <BsChevronCompactRight />}
            </>
          );
        })}
      </ul>
    </nav>
  );
};

export default PageBreadCrumb;
