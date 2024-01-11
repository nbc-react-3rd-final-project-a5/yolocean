import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (res: NextResponse, context: { params: { userId: string } }) => {
  const {
    params: { userId }
  } = context;
  let { data: cart, error } = await supabase
    .from("cart")
    .select(`*, store(name), product(name, thumbnail, category(category_name), price, percentage_off)`)
    .eq("user_id", userId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(cart);
};
