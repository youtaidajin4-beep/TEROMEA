import { NextResponse, type NextRequest } from "next/server";
import { HEALTH_CHECK_PUBLIC_PATH_PREFIX } from "@/lib/healthCheckConfig";

/**
 * 健康寿命チェック (/health-check) は公式LINEからの流入を前提とし、
 * Googleログイン等の外部認証を使いません。
 * LINE内ブラウザ・Instagram内ブラウザでもそのまま開けるよう、常に公開します。
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(HEALTH_CHECK_PUBLIC_PATH_PREFIX)) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
