import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["hu", "en"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // already localized, or an internal/static path -> leave alone
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  // redirect bare paths to the Hungarian version
  const url = req.nextUrl.clone();
  url.pathname = `/hu${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip API, Next internals, the studio, and any request that looks like a
  // static file (anything with a file extension: .svg, .png, .ico, .txt ...).
  matcher: ["/((?!api|_next|studio|.*\\..*).*)"],
};
