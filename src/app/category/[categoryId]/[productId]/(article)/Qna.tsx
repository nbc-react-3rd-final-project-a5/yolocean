import Pagenation from "@/components/Pagenation";
import ReviewList from "@/components/review/ReviewList";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  productId: string;
}
const Qna = ({ productId }: Props) => {
  const searchParams = useSearchParams();
  // const page = Number(searchParams.get("qna_page")) || 1;
  const [page, setPage] = useState(1);

  const { auth } = useAuthStore();
  const { data: qna, isLoading } = useQuery({
    queryFn: async () => {
      const response = await fetch(`/api/qna/product/${productId}?page=${page}`, { method: "GET" });
      const result = await response.json();
      return result;
    },
    queryKey: ["qna", productId, page]
  });

  return (
    <div>
      <button onClick={() => console.log(searchParams.get("page"))}>params</button>
      <Link href={`/qna/product/${productId}`}>작성테스트</Link>
      {qna && !isLoading && <ReviewList currentUserId={auth} reviewList={qna.qna} listType="qna" />}
      {qna && (
        <Pagenation articleName={"제품문의"} setPage={setPage} maxPage={qna.maxPage} currentPage={page} limit={5} />
      )}
    </div>
  );
};

export default Qna;
