import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import type { Database } from "./types/supabase";

const getUserId = async (req: NextRequest, res: NextResponse) => {
  const supabase = createMiddlewareClient<Database>({ req, res });
  let authCookie = req.cookies.get("sb-hntpomvsqgbdpwrjnsun-auth-token");
  if (authCookie !== undefined) {
    const tokens = JSON.parse(authCookie.value);
    const { data } = await supabase.auth.getUser(tokens[0]);
    if (!data.user) return false;
    const { user } = data;
    return user.id;
  }
  return false;
};

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const tokenUid = await getUserId(req, res);

  if (req.nextUrl.pathname.startsWith("/api")) {
    if (tokenUid && !req.url.includes(tokenUid)) {
      console.log("잘못된 요청");
      return NextResponse.json({ message: "유효하지않은 접근입니다." }, { status: 500 });
    }
  }

  if (req.nextUrl.pathname.startsWith("/users")) {
    if (tokenUid && !req.url.includes(tokenUid)) {
      console.log("잘못된 페이지 접근");
      return NextResponse.redirect(new URL("/", req.url));
    }
}

export const config = {
  matcher: ["/api/user/:path*", "/users/:path*"]
};
