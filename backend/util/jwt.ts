import getEnv from "@/utility/getEnv";
import { jwtVerify, SignJWT } from "jose";

export async function sign(value: any) {
  return await new SignJWT(value)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(new TextEncoder().encode(getEnv("jose_secret_key")));
}

export async function verify(token: string | undefined) {
  if (token === undefined) return { id: null };
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getEnv("jose_secret_key"))
    );
    return verified.payload as { id: string };
  } catch (err) {
    return { id: null };
  }
}
