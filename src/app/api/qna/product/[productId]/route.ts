import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { productId: string } }) => {
  const {
    params: { productId }
  } = context;

  let { data: qna, error } = await supabase
    .from("qna")
    .select("*,userinfo(username,avatar_url)")
    .eq("product_id", productId);

  console.log();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(qna);
};
