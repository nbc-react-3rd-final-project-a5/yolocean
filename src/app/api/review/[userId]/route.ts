import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, params: { userId: string }) => {
  const { userId } = params;
  const { data, error } = await supabase.from("review").select("*").eq("id", userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};

export async function POST(req: NextRequest, params: { userId: string }) {
  const { userId } = params;
  const formData = await req.json();
  console.log(formData);

  const { data, error } = await supabase.from("review").insert(formData);
  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
