import { supabase } from "@/service/supabase";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  const bucket = formData.get("bucket") as string;
  const imageId = formData.get("imageId") as string;
  const targetId = formData.get("targetId") as string;

  const { data, error } = await supabase.storage.from(bucket).upload(`${targetId}/${imageId}`, file, {
    upsert: true
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: dataURL } = supabase.storage.from(bucket).getPublicUrl(`${data.path}`);
  return NextResponse.json(dataURL.publicUrl);
};

export const DELETE = async (req: NextRequest) => {
  const { bucket, path, imageId } = await req.json();

  const { data, error } = await supabase.storage.from(bucket).remove([`${path}/${imageId}`]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};
