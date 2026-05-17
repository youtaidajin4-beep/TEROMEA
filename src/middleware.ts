import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!pathname.startsWith("/_next") && pathname !== "/favicon.ico") {
    // #region agent log
    fetch("http://127.0.0.1:7533/ingest/604d9eab-aa28-449e-a6d2-2c9ef3130568", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "090859" },
      body: JSON.stringify({
        sessionId: "090859",
        runId: "pre-fix",
        hypothesisId: "H6,H7,H9",
        location: "src/middleware.ts:middleware",
        message: "request reached current next middleware",
        data: {
          pathname,
          hasSearch: search.length > 0,
          host: request.headers.get("host")
        },
        timestamp: Date.now()
      })
    }).catch(() => {});
    // #endregion
  }

  return NextResponse.next();
}

