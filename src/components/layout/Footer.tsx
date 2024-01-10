import Link from "next/link";
import React from "react";
import footerData from "@/data/footerData.json";

const Footer = () => {
  const { linkList, infoList } = footerData;
  return (
    <footer>
      <nav className="text-[#999] py-[20px] border-y-[1px] border-[#E5E5E5]">
        <ul className="flex flex-row gap-[20px] text-[14px]">
          {linkList.map((n) => (
            <li className="hover:underline" key={`footer__nav-${n.title}`}>
              <Link href={n.link}>{n.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="py-[40px] flex gap-y-[40px] flex-wrap justify-between">
        {/* left */}
        <div className="text-[14px] flex flex-col gap-[15px]">
          {infoList.map((n, i1) => {
            return (
              <div key={i1} className="flex flex-row gap-[15px]">
                {n.map((info, i2) => {
                  return (
                    <p key={`${i1}-${i2}`}>
                      <span className="mr-[10px] text-[#595959]">{info.title}</span>
                      {info.content}
                      {info.link && (
                        <Link className="ml-[10px] underline" href={info.link.link}>
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
        <div className="flex flex-row gap-[30px]">
          <div className="font-[500] ">
            <p className="mb-[10px] text-[#595959]">고객센터</p>
            <p className=" text-[34px] leading-[34px] tracking-[0.68px] text-[#262626]">1234-5678</p>
          </div>
          <ul className="flex flex-col gap-[6px] text-[#595959] font-[14px]">
            <li className="flex flex-row gap-[15px]">
              <span className="inline-block w-[40px] ">월-금</span>
              AM 10:00 - PM 17:00
            </li>
            <li className="flex flex-row gap-[15px]">
              <span className="inline-block w-[40px] ">점심</span>
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
