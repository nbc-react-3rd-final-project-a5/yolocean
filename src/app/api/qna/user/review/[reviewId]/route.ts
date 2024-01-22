import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { reviewId: string } }) => {
  const {
    params: { reviewId }
  } = context;

  let { data: post, error } = await supabase
    .from("qna")
    .select("*,userinfo(username,avatar_url),product(*,category(*))")
    .eq("id", reviewId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(post![0]);
};

export async function POST(req: NextRequest, context: { params: { reviewId: string } }) {
  const {
    params: { reviewId }
  } = context;
  const data = await req.json();
  const { data: insertData, error } = await supabase.from("qna").update(data).eq("id", reviewId);
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(insertData);
}
