import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async () => {
  let { data: cart, error } = await supabase
    .from("cart")
    .select(`id, count, store(name), product(name, thumbnail)`)
    .eq("user_id", "aba26c49-82c0-42b2-913c-c7676527b553");
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(cart);
};
