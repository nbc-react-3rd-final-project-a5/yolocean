import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export async function GET(res: NextResponse, req: NextRequest) {
  return NextResponse.json("상품 GET");
}

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const bucket = formData.get("bucket") as string;
  const imageId = formData.get("imageId") as string;
  const targetId = formData.get("targetId") as string;

  const { data, error } = await supabase.storage.from(bucket).upload(`${targetId}/${imageId}`, file, {
    upsert: true
  });

  if (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: dataURL } = supabase.storage.from(bucket).getPublicUrl(`${data.path}`);
  return NextResponse.json(dataURL);
}
