"use client";

import CardLists from "@/components/CardLists";
import PageBreadCrumb from "@/components/layout/PageBreadCrumb";
import Section from "@/components/layout/Section";
import { supabase } from "@/service/supabase";
import { useSearchStore } from "@/store/searchStore";
import { Product, ProductProperties } from "@/types/db";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

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

  if (data)
    if (data.length === 0) {
      return "검색 결과 없음";
    } else {
      return data;
    }
  else {
    return error;
  }
};

const SearchPage = () => {
  const { searchWord, setSearchWord } = useSearchStore();
  const { data: searchResult, isLoading } = useQuery({
    queryFn: () => getSearchProduct(searchWord),
    queryKey: ["searchProduct", searchWord]
  });

  useEffect(() => {
    console.log("searchResult", searchResult);
  }, [searchResult]);

  if (isLoading) {
    return <div>로딩중...</div>;
  }
  if (typeof searchResult === "string") {
    return (
      <div>
        <PageBreadCrumb linkList={linkList} />
        <Section title={`"${searchWord}" 검색결과`} isCenter={true}>
          {searchResult}
        </Section>
      </div>
    );
  }

  return (
    <div>
      <PageBreadCrumb linkList={linkList} />
      <Section title={`"${searchWord}" 검색결과`} isCenter={true}>
        <CardLists cardLists={searchResult} />
      </Section>
    </div>
  );
};

export default SearchPage;
