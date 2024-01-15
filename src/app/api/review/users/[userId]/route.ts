import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

// [GET] 해당 유저아이디와 일치하는 모든 review를 가져온다.
export const GET = async (req: NextRequest, context: { params: { userId: string } }) => {
  const { userId } = context.params;
  const { data, error } = await supabase.from("review").select("*").eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};

// [GET] 해당 유저아이디로 새로운 review를 생성한다.
export async function POST(req: NextRequest, context: { params: { userId: string } }) {
  const { userId } = context.params;
  const formData = await req.json();
  console.log(formData);

  const { data, error } = await supabase.from("review").insert(formData);
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
