import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `YOLOCEAN | 찾으시는 검색 결과가 없습니다.`,
    openGraph: {
      images: [`${process.env.PUBLIC_URL}/images/opengraph-image.png`]
    }
  };
}

const SearchPage = () => {
  return <div className="max-w-[1200px] w-full text-center mt-[50px] text-2xl">검색어를 입력해주세요.</div>;
};

export default SearchPage;
