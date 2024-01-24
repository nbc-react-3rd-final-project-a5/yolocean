import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "./types/supabase";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient<Database>({ req, res });

  // Refresh session if expired - required for Server Components
  //   const { data, error } = await supabase.auth.getSession();
  //   console.log("in middleware", data || error);

  let authCookie = req.cookies.get("sb-hntpomvsqgbdpwrjnsun-auth-token");
  if (authCookie !== undefined) {
    const tokens = JSON.parse(authCookie.value);
    const {
      data: { user }
    } = await supabase.auth.getUser(tokens[0]);
    console.log("누구야: ", user);
  }
  return res;
}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)"
  ]
};
