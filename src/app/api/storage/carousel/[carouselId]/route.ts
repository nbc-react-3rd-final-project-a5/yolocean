import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

// Carousel 업데이트
export const POST = async (req: NextRequest, context: { params: { carouselId: string } }) => {
  const {
    params: { carouselId }
  } = context;

  const newCarouseData = await req.json();
  const { error } = await supabase.from("carousel").update(newCarouseData).eq("id", carouselId);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json("데이터를 성공적으로 변경하였습니다.");
};

// Carousel 삭제
export const DELETE = async (_: NextRequest, context: { params: { carouselId: string } }) => {
  const {
    params: { carouselId }
  } = context;

  const { error } = await supabase.from("carousel").delete().eq("id", carouselId);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json("데이터를 성공적으로 삭제하였습니다.");
};
