import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (_: NextRequest) => {
  let { data, error } = await supabase.from("carousel").select("*");

  if (error) {
    return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 500 });
  }

  return NextResponse.json(data);
};

export const POST = async (req: NextRequest) => {
  const newCarouselData = await req.json();

  const { error } = await supabase.from("carousel").insert(newCarouselData).select();

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json("데이터를 성공적으로 등록하였습니다.");
};
