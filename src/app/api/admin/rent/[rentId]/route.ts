import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

//렌트 반납 처리 OR 반납 취소
export const PATCH = async (req: NextRequest, context: { params: { rentId: string } }) => {
  const {
    params: { rentId }
  } = context;

  const body = await req.json();

  const { data: rent, error } = await supabase.from("rentlog").update({ return: body }).eq("id", rentId).select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(rent);
};
