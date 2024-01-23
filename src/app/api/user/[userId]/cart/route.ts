import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

//유저의 장바구니 전체 가져오기
export const GET = async (req: NextRequest, context: { params: { userId: string } }) => {
  const {
    params: { userId: userId }
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

//결제 완료 시 결제한 유저의 카트정보 모두 삭제
export const DELETE = async (_: NextRequest, context: { params: { userId: string } }) => {
  const {
    params: { userId: userId }
  } = context;

  const { error } = await supabase.from("cart").delete().eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(true);
};
