import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { categoryId: string } }) => {
  const {
    params: { categoryId }
  } = context;
  let { data: post, error } = await supabase
    .from("product")
    .select("*,category(category_name),stock(count,store_id)")
    .eq("category_id", categoryId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(post);
};
