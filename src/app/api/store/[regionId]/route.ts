import { supabase } from "@/service/supabase";
import { NextResponse } from "next/server";

export const GET = async (res: NextResponse, context: { params: { regionId: string } }) => {
  const {
    params: { regionId }
  } = context;

  let { data: store, error } = await supabase.from("store").select("*,stock(count)").eq("region_id", regionId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(store);
};
