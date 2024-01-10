import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  return NextResponse.json("Store GET");
}

export async function POST(req: NextRequest) {
  const data = req.json();
  //   await supabase.from("store").insert(data);
}
