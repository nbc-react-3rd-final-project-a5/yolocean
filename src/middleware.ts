import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import type { Database } from "./types/supabase";

const ADMIN = process.env.NEXT_PUBLIC_ADMIN;

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
    if (tokenUid === ADMIN) {
      return res;
    }
    if (tokenUid && !req.url.includes(tokenUid))
      return NextResponse.json({ message: "유효하지않은 접근입니다." }, { status: 500 });
  }

  if (req.nextUrl.pathname.startsWith("/users")) {
    if (!tokenUid || (tokenUid && !req.url.includes(tokenUid))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/form")) {
    const url = new URL(req.url);
    // 로그인 되지않은 사용자가 접속했을 때 접근을 막는다.
    if (tokenUid) {
      // 로그인 된 사용자가 접속했을 때 userId가 있으면 searchParams에 붙여주고 아니면 userId를 붙여준다..
      if (req.url.includes(tokenUid)) return NextResponse.next();
      url.searchParams.set("userId", tokenUid);
      return NextResponse.redirect(url);
    }
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/cart")) {
    if (!tokenUid || (tokenUid && !req.url.includes(tokenUid))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/payment")) {
    if (!tokenUid || (tokenUid && !req.url.includes(tokenUid))) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  if (req.nextUrl.pathname.startsWith("/auth")) {
    if (tokenUid) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // 어드민 체크 (구현은 안함)
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (tokenUid !== ADMIN) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
}

export const config = {
  matcher: [
    "/api/user/:path*",
    "/users/:path*",
    "/form/:path*",
    "/cart/:path*",
    "/payment/:path*",
    "/auth/:path*",
    "/admin/:path*"
  ]
};
