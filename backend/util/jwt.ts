import { jwtVerify, SignJWT } from "jose";

export async function sign(value: any) {
  return await new SignJWT(value)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.JOSE_SECRET_KEY));
}

export async function verify(token: string | undefined) {
  if (token === undefined) return { id: null };
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JOSE_SECRET_KEY)
    );
    return verified.payload as { id: string };
  } catch (err) {
    return { id: null };
  }
}
