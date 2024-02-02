"use client";
import React from "react";
import QnaCard from "./QnaCard";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination";
import Filter from "./Filter";
import { getAllQna } from "@/service/table";

interface Props {
  searchParams: { [key: string]: any } | undefined;
}

const Qna = ({ searchParams }: Props) => {
  const page = Number(searchParams?.page) || 1;
  const answer = searchParams?.answer || "미답변";
  const category = searchParams?.category || "All";

  const { data, isLoading } = useQuery({
    queryFn: async () => await getAllQna({ page, answer, category }),
    queryKey: ["adminQna", String(page), String(answer)]
  });

  console.log(data);
  return (
    <div>
      <Filter category={category} />
      {!isLoading &&
        data &&
        data.qna.map((item: any) => (
          <QnaCard page={page} answer={answer} category={category} key={item.id} data={item} />
        ))}
      <Pagination
        articleName=""
        currentPage={page}
        limit={10}
        maxPage={data?.maxPage}
        test={{ answer, category, page }}
      />
    </div>
  );
};

export default Qna;
