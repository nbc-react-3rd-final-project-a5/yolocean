import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

// [GET] 해당 상품의 모든 review
export const GET = async (req: NextRequest, context: { params: { productId: string } }) => {
  const { productId } = context.params;
  const { data, error } = await supabase.from("review").select("*").eq("product_id", productId);

  console.log(productId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};

// [POST] 없음
