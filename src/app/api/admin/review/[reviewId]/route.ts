import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

//리뷰 고정 해제
export const DELETE = async (req: NextRequest, context: { params: { reviewId: string } }) => {
  const {
    params: { reviewId }
  } = context;

  const { error } = await supabase.from("fixed_review").delete().eq("id", reviewId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(true);
};

//리뷰 고정
export const POST = async (req: NextRequest, context: { params: { reviewId: string } }) => {
  const {
    params: { reviewId }
  } = context;

  const body = await req.json();

  const { data: review_id, error } = await supabase.from("fixed_review").insert(body);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(review_id);
};
