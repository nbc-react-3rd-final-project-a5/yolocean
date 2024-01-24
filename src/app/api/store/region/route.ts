import { supabase } from "@/service/supabase";
import { NextResponse } from "next/server";

export const GET = async () => {
  let { data: region, error } = await supabase.from("region").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(region);
};
