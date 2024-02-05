"use client";
import React, { useEffect, useState } from "react";
import QnaCard from "./QnaCard";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@/components/Pagination";
import Filter from "./Filter";
import { deleteUserQna, getAdminProductQna, getAllQna, updateUserQna } from "@/service/table";
import { useCustomMutation } from "@/hook";
import Spinner from "@/components/Spinner";

interface Props {
  searchParams: { [key: string]: any } | undefined;
}

const Qna = ({ searchParams }: Props) => {
  const page = Number(searchParams?.page) || 1;
  const answer = searchParams?.answer || "답변완료";
  const category = searchParams?.category || "All";
  const [loading, setLoading] = useState(false);

  const { data, isLoading } = useQuery({
    queryFn:
      category === "All"
        ? async () => await getAllQna({ page, answer, category })
        : async () => await getAdminProductQna({ page, answer, categoryId: category }),
    queryKey: ["adminQna", String(page), String(answer), category]
  });

  const { mutate: createAnswer } = useCustomMutation({
    mutationFn: async ({ body, qnaId, userId }: { qnaId: string; userId: string; body: string }) =>
      await updateUserQna({ body, qnaId, userId }),
    queryKey: ["adminQna", String(page), String(answer), category]
  });

  const { mutate: deleteQna, isSuccess } = useCustomMutation({
    mutationFn: async ({ qnaId, userId }: { qnaId: string; userId: string }) => await deleteUserQna({ qnaId, userId }),
    queryKey: ["adminQna", String(page), String(answer), category]
  });

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section>
      <Filter category={category} />
      {!isLoading &&
        data &&
        data.qna.map((item: any) => (
          <QnaCard
            page={page}
            answer={answer}
            category={category}
            key={item.id}
            data={item}
            createAnswer={createAnswer}
            deleteQna={deleteQna}
          />
        ))}
      <Pagination
        articleName=""
        currentPage={page}
        limit={10}
        maxPage={data?.maxPage}
        test={{ answer, category, page }}
      />
    </section>
  );
};

export default Qna;
