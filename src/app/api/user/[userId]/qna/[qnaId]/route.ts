import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { qnaId: string } }) => {
  const {
    params: { qnaId }
  } = context;

  let { data: post, error } = await supabase
    .from("qna")
    .select("*,userinfo!inner(username,avatar_url),product!inner(*,category(*))")
    .eq("id", qnaId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(post![0]);
};

export async function PATCH(req: NextRequest, context: { params: { qnaId: string } }) {
  const {
    params: { qnaId }
  } = context;
  const data = await req.json();
  const { data: insertData, error } = await supabase.from("qna").update(data).eq("id", qnaId);
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(insertData);
}
