import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest, context: { params: { bannerName: string } }) => {
  const {
    params: { bannerName }
  } = context;

  const { data, error } = await supabase.from("banner").select("*").eq("banner_name", bannerName);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (data && data.length === 0) {
    return NextResponse.json({ error: "bannerName에 일치하는 데이터를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json(data[0]);
};
