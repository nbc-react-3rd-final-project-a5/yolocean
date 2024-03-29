import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { userId: string } }) => {
  const { userId } = context.params;
  const searchParams = req.nextUrl.searchParams;

  const PAGE = searchParams.get("page") || 1;
  const page = Number(PAGE);

  const limit = 5;
  const min = (page - 1) * limit;
  const max = page * limit - 1;

  const { count } = await supabase.from("qna").select("", { count: "exact", head: true }).eq("user_id", userId);

  const maxPage = Math.ceil(Number(count) / limit);
  const nextPage = page === maxPage ? null : page + 1;
  const prevPage = page === 1 ? null : page - 1;

  const { data: qna, error } = await supabase
    .from("qna")
    .select("*,userinfo!inner(username,avatar_url), product(name, thumbnail)")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)
    .range(min, max);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ qna, maxPage, nextPage, prevPage });
};

export async function POST(req: NextRequest, context: { params: { userId: string } }) {
  const { userId } = context.params;
  const data = await req.json();
  const { data: insertData, error } = await supabase.from("qna").insert({ ...data, user_id: userId });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(insertData);
}
