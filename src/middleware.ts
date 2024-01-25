import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import type { Database } from "./types/supabase";

const getUserId = async (req: NextRequest, res: NextResponse) => {
  // Create a Supabase client configured to use cookies
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

export async function middleware(req: NextRequest) {}

// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    // "/((?!_next/static|_next/image|favicon.ico).*)",
    // "/cart/:path*"
    "/api/user/:path*",
    "/users/:path*"
  ]
};
