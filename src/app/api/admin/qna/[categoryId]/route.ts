import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { categoryId: string } }) {
  const categoryId = context.params.categoryId;

  const searchParams = req.nextUrl.searchParams;
  const ANSWER = searchParams.get("answer");

  const PAGE = searchParams.get("page") || 1;
  const page = Number(PAGE);

  const limit = 10;
  const min = (page - 1) * limit;
  const max = page * limit - 1;

  if (ANSWER === "답변완료") {
    let { count } = await supabase
      .from("qna")
      .select("product!inner(category_id)", { count: "exact", head: true })
      .not("answer", "is", null)
      .eq("product.category_id", categoryId as string);

    const maxPage = Math.ceil(Number(count) / limit);
    const nextPage = page === maxPage ? null : page + 1;
    const prevPage = page === 1 ? null : page - 1;

    let { data: qna, error } = await supabase
      .from("qna")
      .select("*,userinfo!inner(username,avatar_url,id),product!inner(thumbnail,name,category_id)")
      .eq("product.category_id", categoryId as string)
      .not("answer", "is", null)
      .limit(limit)
      .order("created_at", { ascending: false })
      .range(min, max);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ qna, maxPage, nextPage, prevPage });
  }

  let { count } = await supabase
    .from("qna")
    .select("product!inner(category_id),", { count: "exact", head: true })
    .eq("product.category_id", categoryId as string)
    .is("answer", null);

  const maxPage = Math.ceil(Number(count) / limit);
  const nextPage = page === maxPage ? null : page + 1;
  const prevPage = page === 1 ? null : page - 1;

  let { data: qna, error } = await supabase
    .from("qna")
    .select("*,userinfo!inner(username,avatar_url,id),product!inner(thumbnail,name,category_id)")
    .eq("product.category_id", categoryId as string)
    .is("answer", null)
    .limit(limit)
    .order("created_at", { ascending: false })
    .range(min, max);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ qna, maxPage, nextPage, prevPage });
}
