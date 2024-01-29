import CardLists from "@/components/CardLists";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import Section from "@/components/layout/Section";
import { supabase } from "@/service/supabase";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({ params }: { params: { searchWord: string } }): Promise<Metadata> {
  const searchWord = params?.searchWord;

  return {
    title: `YOLOCEAN - ${decodeURIComponent(searchWord)} 검색결과`,
    openGraph: {
      images: ["/opengraph-image.png"]
    }
  };
}

const linkList = [
  {
    name: "홈",
    url: "https://yolocean.vercel.app/"
  },
  {
    name: "검색결과",
    url: "https://yolocean.vercel.app/search"
  }
];

const getSearchProduct = async (searchWord: string): Promise<any> => {
  const { data, error } = await supabase
    .from("product")
    .select("*,category(category_name),stock(count,store(address,name))")
    .like("name", `%${searchWord}%`);

  if (!data) {
    return error;
  } else {
    return data;
  }
};

const SearchPage = async ({ params }: { params: { searchWord: string } }) => {
  const searchKeyword = decodeURIComponent(params.searchWord);
  const searchResult = await getSearchProduct(searchKeyword);

  if (searchResult.length === 0) {
    return (
      <div>
        <PageBreadCrumb linkList={linkList} />
        <Section title={`"${searchKeyword}" 검색결과`} isCenter={true}>
          <p>검색결과 없음</p>
        </Section>
      </div>
    );
  }
  return (
    <div>
      <PageBreadCrumb linkList={linkList} />
      <Section title={`"${searchKeyword}" 검색결과`} isCenter={true}>
        <CardLists cardLists={searchResult} />
      </Section>
    </div>
  );
};

export default SearchPage;
