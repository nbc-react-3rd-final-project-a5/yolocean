import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

// [GET] 해당 유저아이디와 리뷰 아이디가 일치하는 리뷰를 가져온다.
export const GET = async (req: NextRequest, context: { params: { userId: string; reviewId: string } }) => {
  const { userId, reviewId } = context.params;
  const { data, error } = await supabase
    .from("review")
    .select("*, store!inner(name), userinfo!inner(username), product!inner(name, thumbnail)")
    .eq("user_id", userId)
    .eq("id", reviewId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};

// [POST] 해당 유저아이디와 리뷰 아이디가 일치하는 리뷰를 수정한다.
