import { NextRequest, NextResponse } from "next/server";
import { ratelimit } from "@/lib/rateLimit";

export const config = {
  matcher: "/api/:path*",
};

export async function proxy(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  const { ok } = await ratelimit(`api:${ip}`, { windowMs: 60_000, max: 10 });

  if (!ok) {
    return new NextResponse("Too many requests", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  return NextResponse.next();
}
