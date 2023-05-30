import { jwtVerify, SignJWT } from "jose";

export async function sign(value: any) {
  return await new SignJWT(value)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
}

export async function verify(token: string) {
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload as { id: string };
  } catch (err) {
    return { id: null };
  }
}
