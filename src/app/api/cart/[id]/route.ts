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

export const POST = async (req: NextRequest, context: { params: { id: string } }) => {
  const {
    params: { id }
  } = context;
  const body = await req.json();

  const { data: eqProduct, error: eqError } = await supabase
    .from("cart")
    .select("*")
    .eq("product_id", body.product_id)
    .eq("store_id", body.store_id);

  if (eqError) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 500 });
  }

  if (eqProduct?.length > 0) {
    const { data: cart, error } = await supabase
      .from("cart")
      .update({ ...body })
      .eq("id", eqProduct[0].id);

    return NextResponse.json({ message: "장바구니 상품이 업데이트 되었습니다." }, { status: 200 });
  }

  const { data: cart, error } = await supabase.from("cart").insert([{ ...body }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ message: "상품이 장바구니에 추가되었습니다" }, { status: 200 });
};
