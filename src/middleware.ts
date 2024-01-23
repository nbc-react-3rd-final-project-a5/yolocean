import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  console.log("불법적인 admin 접근 감지");
  let sbAccessToken = request.cookies.get("sb-access-token");
  console.log(sbAccessToken);
  return NextResponse.redirect(new URL("/", request.url));
};
// See "Matching Paths" below to learn more
export const config = {
  matcher: "/admin/:path*"
};
