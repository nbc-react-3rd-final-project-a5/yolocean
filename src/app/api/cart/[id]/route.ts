import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
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

export const POST = async (req: NextRequest, context: { params: { id: string } }) => {
  const {
    params: { id }
  } = context;
  const body = await req.json();

  const { data: eqProduct, error: eqError } = await supabase.from("cart").select("*").eq("product_id", body.product_id);

  if (eqError) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 500 });
  }

  if (eqProduct?.length > 0) {
    const { data: cart, error } = await supabase
      .from("cart")
      .update({ ...body })
      .eq("id", eqProduct[0].id);

    return NextResponse.json({ message: "장바구니 업데이트 성공" }, { status: 200 });
  }

  const { data: cart, error } = await supabase.from("cart").insert([{ ...body }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "장바구니 담기 성공" }, { status: 200 });
};

//결제 완료 시 결제한 유저의 카트정보 모두 삭제
export const DELETE = async (_: NextRequest, context: { params: { id: string } }) => {
  const {
    params: { id: userId }
  } = context;

  const { error } = await supabase.from("cart").delete().eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(true);
};

//장바구니 수량 변경
export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  const {
    params: { id: cartId }
  } = context;

  const body = await req.json();

  const { data: cartItem, error } = await supabase.from("cart").update({ count: body }).eq("id", cartId).select();

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(cartItem);
}
