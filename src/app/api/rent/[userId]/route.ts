import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { userId: string } }) => {
  const {
    params: { userId }
  } = context;

  const { data: rent, error } = await supabase.from("rent").select("*").eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(rent);
};

export const POST = async (req: NextRequest, context: { params: { userId: string } }) => {
  const {
    params: { userId }
  } = context;

  const body = await req.json();

  const { data: rent, error } = await supabase.from("rent").insert(body);

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(rent);
};
