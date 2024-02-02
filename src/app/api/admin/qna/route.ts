import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { productId: string } }) => {
  const searchParams = req.nextUrl.searchParams;

  console.log(searchParams);
  const ANSWER = searchParams.get("answer");
  const CATEGORY = searchParams.get("category");
  const PAGE = searchParams.get("page") || 1;
  const page = Number(PAGE);

  const limit = 10;
  const min = (page - 1) * limit;
  const max = page * limit - 1;

  let { count } = await supabase.from("qna").select("product!inner(category_id)", { count: "exact", head: true });

  const maxPage = Math.ceil(Number(count) / limit);
  const nextPage = page === maxPage ? null : page + 1;
  const prevPage = page === 1 ? null : page - 1;

  let { data: qna, error } = await supabase
    .from("qna")
    .select("*,userinfo!inner(username,avatar_url,id),product!inner(thumbnail,name)")
    .limit(limit)
    .order("created_at", { ascending: false })
    .range(min, max);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ qna, maxPage, nextPage, prevPage });
};
