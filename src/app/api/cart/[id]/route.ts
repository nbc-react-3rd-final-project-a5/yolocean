import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (res: NextResponse, context: { params: { id: string } }) => {
  const {
    params: { id: userId }
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

// export const POST = async (req: NextRequest, context: { params: { cartId: string } }) => {
//   const {
//     params: { cartId }
//   } = context;
//   const updateData = await req.json();

//   const { data: cart, error } = await supabase.from("cart").update(updateData).eq("id", cartId).select();

//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
//   return NextResponse.json(cart);
// };
