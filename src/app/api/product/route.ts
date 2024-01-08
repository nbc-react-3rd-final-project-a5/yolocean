import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  let { data: post, error } = await supabase.from("product").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(post);
};
