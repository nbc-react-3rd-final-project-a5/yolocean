import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { qnaId: string } }) => {
  const {
    params: { qnaId }
  } = context;

  let { data: qna, error } = await supabase
    .from("qna")
    .select("*,userinfo(username,avatar_url),product(*,category(*))")
    .eq("id", qnaId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(qna![0]);
};

export async function PATCH(req: NextRequest, context: { params: { qnaId: string } }) {
  const {
    params: { qnaId }
  } = context;
  const data = await req.json();
  const { data: insertData, error } = await supabase.from("qna").update(data).eq("id", qnaId).select("*");

  console.log(insertData);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(insertData[0]);
}

export async function DELETE(_: NextRequest, context: { params: { qnaId: string } }) {
  const { qnaId } = context.params;

  const { error } = await supabase.from("qna").delete().eq("id", qnaId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(true);
}
