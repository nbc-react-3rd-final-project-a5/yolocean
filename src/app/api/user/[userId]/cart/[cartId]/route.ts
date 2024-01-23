import { supabase } from "@/service/supabase";
import { useSearchParams } from "next/navigation";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { userId: string; cartId: string } }) => {
  const {
    params: { userId }
  } = context;

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const { data, error } = await supabase.from("cart").select("*").eq("product_id", productId!).eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};

export const POST = async (req: NextRequest, context: { params: { userId: string; cartId: string } }) => {
  const {
    params: { cartId, userId }
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

//장바구니 수량 변경
export async function PATCH(req: NextRequest, context: { params: { cartId: string } }) {
  const {
    params: { cartId: cartId }
  } = context;

  const body = await req.json();

  const { data: cartItem, error } = await supabase.from("cart").update({ count: body }).eq("id", cartId).select();

  if (error) {
    console.log(error);
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
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(true);
}
