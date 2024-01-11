import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  return NextResponse.json("Store GET");
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { data: insertData, error } = await supabase.from("store").insert(data);
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(insertData);
}
