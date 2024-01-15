import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

// [GET] 모든 review를 가져온다. (관리자 사용)
export const GET = async (req: NextRequest) => {
  const { data, error } = await supabase.from("review").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};
