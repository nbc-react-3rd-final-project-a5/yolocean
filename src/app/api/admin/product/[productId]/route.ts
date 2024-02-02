import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, context: { params: { productId: string } }) {
  const { productId } = context.params;
  const body = await req.json();

  let { data: product, error } = await supabase
    .from("product")
    .update({ ...body })
    .eq("id", productId)
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(product);
}

export async function DELETE(req: NextRequest, context: { params: { productId: string } }) {
  const { productId } = context.params;

  let { data, error } = await supabase.from("product").delete().eq("id", productId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
