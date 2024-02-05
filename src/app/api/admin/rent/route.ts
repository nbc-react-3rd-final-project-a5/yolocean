import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const store = searchParams.get("store") || "all";
  const PAGE = searchParams.get("page") || 1;
  const order = searchParams.get("order") || "true";

  const page = Number(PAGE);

  const limit = 10;
  const min = (page - 1) * limit;
  const max = page * limit - 1;

  if (store === "all") {
    let { count } = await supabase.from("rentlog").select("", { count: "exact", head: true });

    const maxPage = Math.ceil(Number(count) / limit);
    const nextPage = page === maxPage ? null : page + 1;
    const prevPage = page === 1 ? null : page - 1;

    let { data: rentlog, error } = await supabase
      .from("rentlog")
      .select("*, userinfo(*)")
      .limit(limit)
      .range(min, max)
      .order("rent_date", { ascending: JSON.parse(order) });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ rentlog, maxPage, nextPage, prevPage });
  } else {
    let { count } = await supabase
      .from("rentlog")
      .select("store!inner(id)", { count: "exact", head: true })
      .eq("store.id", store);

    const maxPage = Math.ceil(Number(count) / limit);
    const nextPage = page === maxPage ? null : page + 1;
    const prevPage = page === 1 ? null : page - 1;

    let { data: rentlog, error } = await supabase
      .from("rentlog")
      .select("*, store!inner(id), userinfo(*)")
      .eq("store.id", store)
      .limit(limit)
      .range(min, max)
      .order("created_at", { ascending: JSON.parse(order) });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ rentlog, maxPage, nextPage, prevPage });
  }
};
