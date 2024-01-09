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

  console.log({
    file,
    bucket,
    imageId,
    targetId
  });

  const { data, error } = await supabase.storage.from(bucket).upload(`${targetId}/${imageId}`, file, {
    upsert: false
  });

  console.log(data);

  if (error) {
    console.error("🧨error 발생");
    console.log(error);

    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json(data);
}
