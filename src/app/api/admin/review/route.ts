import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const category = searchParams.get("category") || "all";
  const PAGE = searchParams.get("page") || 1;
  const order = searchParams.get("order") || "true";

  const page = Number(PAGE);

  const limit = 10;
  const min = (page - 1) * limit;
  const max = page * limit - 1;

  if (category === "all") {
    let { count } = await supabase.from("review").select("", { count: "exact", head: true });

    const maxPage = Math.ceil(Number(count) / limit);
    const nextPage = page === maxPage ? null : page + 1;
    const prevPage = page === 1 ? null : page - 1;

    let { data: reviews, error } = await supabase
      .from("review")
      .select(
        "*, product(name, thumbnail, category_id, category(category_name)), store(name), userinfo(username), fixed_review(id)"
      )
      .limit(limit)
      .range(min, max)
      .order("created_at", { ascending: JSON.parse(order) });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ reviews, maxPage, nextPage, prevPage });
  } else {
    let { count } = await supabase
      .from("review")
      .select("product!inner(category_id)", { count: "exact", head: true })
      .eq("product.category_id", category);

    const maxPage = Math.ceil(Number(count) / limit);
    const nextPage = page === maxPage ? null : page + 1;
    const prevPage = page === 1 ? null : page - 1;

    let { data: reviews, error } = await supabase
      .from("review")
      .select(
        "*, product!inner(name, thumbnail, category_id, category(category_name)), store(name), userinfo(username), fixed_review(id)"
      )
      .eq("product.category_id", category)
      .limit(limit)
      .range(min, max)
      .order("created_at", { ascending: JSON.parse(order) });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ reviews, maxPage, nextPage, prevPage });
  }
};
