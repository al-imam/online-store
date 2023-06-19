import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import COOKIES from "$utility/COOKIES";
import { verify } from "$backend/util/jwt";
import { Types } from "mongoose";

export async function middleware(req: NextRequest) {
  const { id, role } = await verify(req.cookies.get(COOKIES)?.value as string);

  if (id && Types.ObjectId.isValid(id)) {
    const admin = req.nextUrl.pathname.includes("/admin/");
    if (!admin) return NextResponse.next();
    if (role === "admin") return NextResponse.next();
    return NextResponse.redirect(new URL("/me", req.url));
  }

  return NextResponse.redirect(new URL("/singin", req.url));
}

export const config = {
  matcher: ["/me/:name*", "/shipping"],
};
