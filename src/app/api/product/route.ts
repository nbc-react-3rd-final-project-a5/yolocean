import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  //await supabaseForServer.from("books").insert({name:"foo", authorName:"bar"})
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { error } = await supabase.from("product").insert(data);
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
