import { revalidateTag } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest, context: { params: { categoryId: string } }) => {
  revalidateTag("qna");

  return NextResponse.json({ revalidated: true, now: Date.now() });
};