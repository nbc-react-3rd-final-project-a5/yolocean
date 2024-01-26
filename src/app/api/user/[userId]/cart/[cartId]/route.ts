import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { userId: string; cartId: string } }) => {
  const {
    params: { userId }
  } = context;

  const searchParams = req.nextUrl.searchParams;
  const productId = searchParams.get("productId");

  const { data, error } = await supabase.from("cart").select("*").eq("product_id", productId!).eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};

//장바구니 수량 변경
export async function PATCH(req: NextRequest, context: { params: { cartId: string } }) {
  const {
    params: { cartId: cartId }
  } = context;

  const body = await req.json();

  const { data: cartItem, error } = await supabase
    .from("cart")
    .update({ ...body })
    .eq("id", cartId)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(cartItem);
}

//장바구니 상품 삭제
export async function DELETE(req: NextRequest, context: { params: { cartId: string } }) {
  const {
    params: { cartId: cartId }
  } = context;

  const { error } = await supabase.from("cart").delete().eq("id", cartId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(true);
}
