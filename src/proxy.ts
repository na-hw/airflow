import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { isAllowedImageReferer } from "@/lib/hotlink";

/** Blocks other websites from hotlinking our images. */
export function proxy(request: NextRequest) {
  const referer = request.headers.get("referer");

  // The host the browser asked for: behind Vercel's edge it arrives as
  // x-forwarded-host, otherwise as the Host header (strip any port).
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "")
    .split(",")[0]
    .trim()
    .replace(/:\d+$/, "");

  if (!isAllowedImageReferer(referer, host)) {
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/images/:path*",
};
