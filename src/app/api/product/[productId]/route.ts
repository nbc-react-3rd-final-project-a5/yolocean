import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { productId: string } }) => {
  const {
    params: { productId }
  } = context;

  let { data: post, error } = await supabase
    .from("product")
    .select("*,category!inner(category_name)")
    .eq("id", productId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(post![0]);
};

export async function PATCH(req: NextRequest, context: { params: { productId: string } }) {
  const { productId } = context.params;
  const body = await req.json();
  console.log(body);
  console.log(req);
  console.log("야임마");
  let { data: post, error } = await supabase
    .from("product")
    .update({ ...body })
    .eq("id", productId)
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(post);
}
