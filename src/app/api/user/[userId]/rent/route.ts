import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { userId: string } }) => {
  const {
    params: { userId }
  } = context;

  const searchParams = req.nextUrl.searchParams;
  const isReturn = searchParams.get("isReturn")!;
  const page = Number(searchParams.get("page") || 1);
  const limit = 5;
  const min = (page - 1) * limit;
  const max = page * limit - 1;

  const { count } = await supabase
    .from("rentlog")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("return", isReturn);

  const maxPage = Math.ceil(Number(count) / limit);
  const nextPage = page === maxPage ? null : page + 1;
  const prevPage = page === 1 ? null : page - 1;

  const { data: rent, error } = await supabase
    .from("rentlog")
    .select("*")
    .eq("user_id", userId)
    .eq("return", isReturn)
    .order("rent_date", { ascending: !JSON.parse(isReturn) })
    .limit(limit)
    .range(min, max);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ rent, maxPage, nextPage, prevPage });
};

export const POST = async (req: NextRequest, context: { params: { userId: string } }) => {
  const {
    params: { userId }
  } = context;

  const body = await req.json();

  const { data: rent, error } = await supabase.from("rentlog").insert(body);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(rent);
};
