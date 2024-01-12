import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (res: NextResponse, context: { params: { userId: string } }) => {
  const {
    params: { userId }
  } = context;

  let { data: cart, error } = await supabase
    .from("cart")
    .select(`*, store(name), product(name, thumbnail, category(category_name), price, percentage_off)`)
    .eq("user_id", userId)
    .order("id", { ascending: false });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(cart);
};

export const POST = async (req: NextRequest, context: { params: { cartId: string; count: number } }) => {
  const {
    params: { cartId, count }
  } = context;

  const { data: cart, error } = await supabase.from("cart").update({ count: count }).eq("id", cartId).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(cart);
};
