import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  let { data, error } = await supabase.from("carousel").select("*");

  if (error) {
    return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 500 });
  }

  return NextResponse.json(data);
};
