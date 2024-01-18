import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { data: insertData, error } = await supabase.from("qna").insert(data);
  console.log(data);
  const { data: category, error: categoryError } = await supabase
    .from("product")
    .select("category_id")
    .eq("id", data.product_id);
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(category![0]);
}
