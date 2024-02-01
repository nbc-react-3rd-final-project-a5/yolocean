import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  let { data: reviews, error } = await supabase
    .from("review")
    .select(
      "*, product(name, thumbnail, category_id, category(category_name)), store(name), userinfo(username), fixed_review(id)"
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(reviews);
};
