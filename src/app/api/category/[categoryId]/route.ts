import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, context: { params: { categoryId: string } }) => {
  const {
    params: { categoryId }
  } = context;
  let { data, error } = await supabase.from("category").select("category_name").eq("id", categoryId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data![0].category_name);
};
