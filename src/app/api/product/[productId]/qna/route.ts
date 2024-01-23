import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { productId: string } }) => {
  const {
    params: { productId }
  } = context;

  const searchParams = req.nextUrl.searchParams;

  const PAGE = searchParams.get("page") || 1;
  const page = Number(PAGE);

  const limit = 5;
  const min = (page - 1) * limit;
  const max = page * limit - 1;

  let { count } = await supabase.from("qna").select("", { count: "exact", head: true }).eq("product_id", productId);

  const maxPage = Math.ceil(Number(count) / limit);
  const nextPage = page === maxPage ? null : page + 1;
  const prevPage = page === 1 ? null : page - 1;

  let { data: qna, error } = await supabase
    .from("qna")
    .select("*,userinfo!inner(username,avatar_url)")
    .eq("product_id", productId)
    .limit(limit)
    .range(min, max);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ qna, maxPage, nextPage, prevPage });
};
