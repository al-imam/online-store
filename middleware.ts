import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  return NextResponse.redirect(new URL("/singup", req.url));
}

export const config = {
  matcher: "/me",
};
