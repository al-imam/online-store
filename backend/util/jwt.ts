import { jwtVerify, SignJWT } from "jose";
import { Types } from "mongoose";

export async function sign(value: {
  id: Types.ObjectId | string;
  role: string;
}) {
  return await new SignJWT(value)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.JOSE_SECRET_KEY));
}

type Failed = { id: null; role: null };
type Success = { [k in keyof Failed]: string };
const failed = { id: null, role: null };

export async function verify(
  token: string | undefined
): Promise<Failed | Success> {
  if (token === undefined) return failed;
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JOSE_SECRET_KEY)
    );
    return verified.payload as Success;
  } catch (err) {
    return failed;
  }
}
