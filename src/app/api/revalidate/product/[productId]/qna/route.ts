import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, context: { params: { productId: string } }) {
  const { productId } = context.params;

  console.log(productId);

  revalidatePath(`${process.env.NEXT_PUBLIC_DOMAIN_URL}/product/${productId}?article=제품문의`, "layout");
  if (productId) {
    revalidateTag(productId);
    return NextResponse.json({ revalidated: true, now: Date.now() }, { status: 200 });
  }

  return NextResponse.json(
    {
      message: "Missing path to revalidate"
    },
    { status: 500 }
  );
}
