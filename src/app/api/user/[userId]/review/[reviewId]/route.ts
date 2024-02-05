import { supabase } from "@/service/supabase";
import { revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

// [GET] 해당 유저아이디와 리뷰 아이디가 일치하는 리뷰를 가져온다.
export const GET = async (_: NextRequest, context: { params: { reviewId: string } }) => {
  const { reviewId } = context.params;
  const { data, error } = await supabase
    .from("review")
    .select(
      "*, store!inner(name, region!inner(region)), userinfo!inner(username, avatar_url), product!inner(name, thumbnail)"
    )
    .eq("id", reviewId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
};

// [PATCH] 해당 유저아이디와 리뷰 아이디가 일치하는 리뷰를 수정한다.
export async function PATCH(req: NextRequest, context: { params: { reviewId: string } }) {
  const { reviewId } = context.params;
  const updateData = await req.json();
  const { data, error } = await supabase
    .from("review")
    .update({ title: updateData.title, content: updateData.content, url: updateData.url })
    .eq("id", reviewId)
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// [DELETE] 해당 유저아이디와 리뷰 아이디가 일치하는 리뷰를 삭제한다.
export async function DELETE(_: NextRequest, context: { params: { reviewId: string } }) {
  const { reviewId } = context.params;

  const { error } = await supabase.from("review").delete().eq("id", reviewId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(true);
}
