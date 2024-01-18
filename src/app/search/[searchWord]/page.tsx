import CardLists from "@/components/CardLists";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import Section from "@/components/layout/Section";
import { supabase } from "@/service/supabase";
import React from "react";

const linkList = [
  {
    name: "홈",
    url: "http://localhost:3000/"
  },
  {
    name: "검색결과",
    url: "http://localhost:3000/search"
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
