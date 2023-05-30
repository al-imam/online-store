import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import COOKIES from "./utility/COOKIES";
import { verify } from "./backend/util/jwt";

export async function middleware(req: NextRequest) {
  const id = await verify(req.cookies.get(COOKIES)?.value as string);

  console.log(id);

  return NextResponse.next();

  return NextResponse.redirect(new URL("/singup", req.url));
}

export const config = {
  matcher: "/me",
};
