import ReviewList from "@/components/review/ReviewList";
import { getAllProductQna } from "@/service/table";
import Link from "next/link";
import React, { Suspense } from "react";
import Empty from "./Empty";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Pagination from "@/components/Pagination";
import ReviewPulse from "@/components/pulse/ReviewPulse";
import CustomLink from "@/components/CustomLink";
import Revalidate from "./Revalidate";

interface Props {
  productId: string;
  page: number;
}
const Qna = async ({ productId, page }: Props) => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore
  });

  const { user } = (await supabase.auth.getUser()).data;

  const { qna, maxPage, nextPage, prevPage } = await getAllProductQna({ page, productId });

  return (
    <div>
      <Revalidate />
      {user?.id && (
        <div className="flex justify-end items-center  mb-[25px]">
          <CustomLink size="sm" href={`/form?productId=${productId}`}>
            문의 작성
          </CustomLink>
        </div>
      )}

      <Suspense
        fallback={Array.from({ length: 6 }).map((e, i) => (
          <ReviewPulse key={i} />
        ))}
      >
        {maxPage === 0 && <Empty articleName="문의" />}
        <ReviewList productId={productId} currentUserId={user?.id} reviewList={qna} listType="qna" />
        <Pagination articleName={"제품문의"} maxPage={maxPage} currentPage={page} limit={5} />
      </Suspense>
    </div>
  );
};

export default Qna;
