"use client";
import Link from "next/link";
import React from "react";
import SideTab from "./SideTab";
import tabData from "@/data/sideTab.json";

const NavigationBar = () => {
  const { product, store, promotion, review, qna, rent } = tabData;

  return (
    <aside className="float-left h-screen w-[250px] border-r-2 rounded-md border-point">
      <div className="w-full h-[100px] text-[20px] flex items-center justify-center border-b border-line text-white bg-point">
        <Link href={"/admin"}>YOLOCEAN Admin</Link>
      </div>
      <ul className="w-full ">
        <SideTab title={product.title} link={product.link} />
        <SideTab title={store.title} link={store.link} />
        <SideTab title={promotion.title} link={promotion.link} />
        <SideTab title={review.title} link={review.link} />
        <SideTab title={qna.title} link={qna.link} />
        <SideTab title={rent.title} link={rent.link} />
      </ul>
    </aside>
  );
};

export default NavigationBar;
