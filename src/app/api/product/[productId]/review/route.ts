import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

// [GET] 해당 상품의 모든 review
export const GET = async (req: NextRequest, context: { params: { productId: string } }) => {
  const { productId } = context.params;

  const searchParams = req.nextUrl.searchParams;
  const PAGE = searchParams.get("page") || 1;

  const page = Number(PAGE);

  const limit = 5;
  const min = (page - 1) * limit;
  const max = page * limit - 1;

  let { count } = await supabase
    .from("review")
    .select("", { count: "exact", head: true })
    .eq("product_id", productId)
    .not("blind", "is", true);

  const maxPage = Math.ceil(Number(count) / limit);
  const nextPage = page === maxPage ? null : page + 1;
  const prevPage = page === 1 ? null : page - 1;

  let { data: review, error } = await supabase
    .from("review")
    .select(
      "*, store!inner(name, region!inner(region)), userinfo!inner(username, avatar_url), product!inner(name, thumbnail)"
    )
    .eq("product_id", productId)
    .not("blind", "is", true)
    .limit(limit)
    .range(min, max);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ review, maxPage, nextPage, prevPage });
};
