import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `YOLOCEAN - 찾으시는 검색 결과가 없습니다.`,
    openGraph: {
      images: ["/opengraph-image.png"]
    }
  };
}

const SearchPage = () => {
  return <div>검색결과를 입력해주세요</div>;
};

export default SearchPage;
