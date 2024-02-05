import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

// [GET] 해당 유저아이디와 일치하는 모든 review를 가져온다.
export const GET = async (req: NextRequest, context: { params: { userId: string } }) => {
  const { userId } = context.params;

  const searchParams = req.nextUrl.searchParams;

  const PAGE = searchParams.get("page") || 1;
  const page = Number(PAGE);

  const limit = 5;
  const min = (page - 1) * limit;
  const max = page * limit - 1;

  let { count } = await supabase.from("review").select("", { count: "exact", head: true }).eq("user_id", userId);

  const maxPage = Math.ceil(Number(count) / limit);
  const nextPage = page === maxPage ? null : page + 1;
  const prevPage = page === 1 ? null : page - 1;

  const { data: review, error } = await supabase
    .from("review")
    .select(
      "*, store!inner(name, region!inner(region)), userinfo!inner(username, avatar_url), product!inner(name, thumbnail)"
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit)
    .range(min, max);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ review, maxPage, nextPage, prevPage });
};

// [GET] 해당 유저아이디로 새로운 review를 생성한다.
export async function POST(req: NextRequest, context: { params: { userId: string } }) {
  const { userId } = context.params;
  const formData = await req.json();

  const { data, error } = await supabase.from("review").insert(formData);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
