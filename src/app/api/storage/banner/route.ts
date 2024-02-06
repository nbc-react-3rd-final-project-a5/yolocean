import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest) => {
  const { data, error } = await supabase.from("banner").select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
};

// 배너 생성
export const POST = async (req: NextRequest) => {
  const newBannerData = await req.json();
  const { error } = await supabase.from("banner").insert(newBannerData);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json("데이터를 성공적으로 등록하였습니다.");
};
