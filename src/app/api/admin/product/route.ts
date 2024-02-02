import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;
  const PAGE = searchParams.get("page") || 1;
  const page = Number(PAGE);

  const limit = 5;
  const min = (page - 1) * limit;
  const max = page * limit - 1;
  let { count } = await supabase.from("product").select("", { count: "exact", head: true });
  const maxPage = Math.ceil(Number(count) / limit);
  const nextPage = page === maxPage ? null : page + 1;
  const prevPage = page === 1 ? null : page - 1;

  let { data: products, error } = await supabase
    .from("product")
    .select("*,category(category_name),stock(count,store(address,name))")
    .limit(limit)
    .range(min, max);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ products, maxPage, nextPage, prevPage });
};
