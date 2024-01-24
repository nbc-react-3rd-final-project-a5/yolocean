import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  let { data: post, error } = await supabase
    .from("product")
    .select("*,category(category_name),stock(count,store(address,name))");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(post);
};

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { data: insertData, error } = await supabase.from("product").insert(data);
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(insertData);
}
