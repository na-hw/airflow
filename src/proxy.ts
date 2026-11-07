import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALLOWED_HOSTS = [
  "airflowsystem.ir",
  "www.airflowsystem.ir",
  "airflow-chi.vercel.app",
  "localhost",
  "127.0.0.1",
];

export function proxy(request: NextRequest) {
  const referer = request.headers.get("referer");

  if (referer) {
    try {
      const refererHost = new URL(referer).hostname;
      if (!ALLOWED_HOSTS.includes(refererHost)) {
        return new NextResponse(null, { status: 403 });
      }
    } catch {
      // Malformed referer header, allow through.
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/images/:path*",
};
