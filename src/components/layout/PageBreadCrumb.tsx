import Link from "next/link";
import React, { Fragment } from "react";
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
    <nav className={` text-[14px] leading-none text-[#595959] ${marginBottom}`}>
      <ul className="flex flex-row gap-[10px]">
        {linkList.map((n, i) => {
          const isLastLink = i === linkList.length - 1;
          return (
            <Fragment key={n.url}>
              <li className={`${isLastLink && "text-[#262626]"} hover:underline`}>
                {isLastLink ? <p className="cursor-default">{n.name}</p> : <Link href={n.url}>{n.name}</Link>}
              </li>
              {!isLastLink && <BsChevronCompactRight key={i} />}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default PageBreadCrumb;
