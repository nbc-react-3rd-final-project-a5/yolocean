import { supabase } from "@/service/supabase";
import { NextRequest, NextResponse } from "next/server";

// regionId 에 해당하는 모든 store
export const GET = async (req: NextRequest, context: { params: { regionId: string } }) => {
  const {
    params: { regionId }
  } = context;

  let { data: store, error } = await supabase.from("store").select("*,stock(count)").eq("region_id", regionId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(store);
};
