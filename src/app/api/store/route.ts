import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  let { data: store, error } = await supabase.from("store").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(store);
};

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { data: insertData, error } = await supabase.from("store").insert(data);
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(insertData);
}
