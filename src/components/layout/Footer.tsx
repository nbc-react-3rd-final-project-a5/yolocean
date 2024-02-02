import Link from "next/link";
import React from "react";
import footerData from "@/data/footerData.json";

const Footer = () => {
  const { linkList, infoList } = footerData;
  return (
    <footer className="mt-[200px]">
      <nav className="text-tc-light py-[20px] border-y-[1px] border-line">
        <ul className="max-w-[1200px] mx-auto w-[90%] flex  gap-[20px] text-[14px] ">
          {linkList.map((n) => (
            <li className="hover:underline" key={`footer__nav-${n.title}`}>
              <Link href={n.disable ? "#" : n.link} prefetch={false} aria-label={`${n.title}로 이동`}>
                {n.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="max-w-[1200px] mx-auto w-[90%] py-[40px] flex gap-y-[40px] flex-wrap justify-between">
        {/* left */}
        <div className="text-[14px] flex flex-col gap-[15px] mobile:text-[12px]">
          {infoList.map((n, i1) => {
            return (
              <div key={i1} className="flex gap-[15px] flex-wrap">
                {n.map((info, i2) => {
                  return (
                    <p className="whitespace-nowrap" key={`${i1}-${i2}`}>
                      <span className="mr-[10px] text-tc-middle">{info.title}</span>
                      {info.content}
                      {info.link && (
                        <Link
                          className="ml-[10px] underline"
                          href={info.link.link}
                          aria-label={`${info.link.title}로 이동`}
                        >
                          {info.link.title}
                        </Link>
                      )}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
        {/* right */}
        <div className="flex  gap-[30px] ">
          <div className="font-[500]">
            <p className="mb-[10px] text-tc-middle">고객센터</p>
            <p className=" text-[34px] tracking-[0.68px] whitespace-nowrap mobile:text-[24px]">1234-5678</p>
          </div>
          <ul className="flex  flex-col gap-[6px] text-tc-middle text-[14px] mobile:text-[12px]">
            <li className="flex gap-[15px]">
              <span className="inline-block w-[40px] whitespace-nowrap">월-금</span>
              AM 10:00 - PM 17:00
            </li>
            <li className="flex gap-[15px]">
              <span className="inline-block w-[40px] whitespace-nowrap">점심</span>
              PM 12:00 - PM 13:00
            </li>
            <li className="">주말, 공휴일은 휴무</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
