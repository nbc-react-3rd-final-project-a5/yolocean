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

// 배너 업데이트
export const POST = async (req: NextRequest, context: { params: { bannerName: string } }) => {
  const {
    params: { bannerName }
  } = context;

  const newBannerData = await req.json();
  const { error } = await supabase.from("banner").update(newBannerData).eq("banner_name", bannerName);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json("데이터를 성공적으로 변경하였습니다.");
};

// 배너 삭제
export const DELETE = async (req: NextRequest, context: { params: { bannerName: string } }) => {
  const {
    params: { bannerName }
  } = context;

  const { error } = await supabase.from("banner").delete().eq("bannerName", bannerName);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json("데이터를 성공적으로 삭제하였습니다.");
};
