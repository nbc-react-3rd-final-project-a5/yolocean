import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  const { data, error } = await supabase
    .from("fixed_review")
    .select(
      "*, review!inner(*, store!inner(name, region!inner(region)), userinfo!inner(username, avatar_url), product!inner(name, thumbnail, category_id))"
    );
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};
