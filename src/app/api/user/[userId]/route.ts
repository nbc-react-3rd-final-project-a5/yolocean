import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: { params: { userId: string } }) => {
  const {
    params: { userId }
  } = context;
  let { data, error } = await supabase.from("userinfo").select("*").eq("id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data![0]);
};

export async function PATCH(req: NextRequest, context: { params: { userId: string } }) {
  const data = await req.json();
  const {
    params: { userId }
  } = context;
  const { data: userInfo, error } = await supabase.from("userinfo").update(data).eq("id", userId);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(userInfo);
}
