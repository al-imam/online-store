import { verify as dsf } from "jsonwebtoken";
import { jwtVerify } from "jose";

function verifyJWTToken(jwtToken: string): { id: string | null } {
  try {
    return dsf(jwtToken, process.env.JWT_SECRET || "") as { id: string };
  } catch {
    return { id: null };
  }
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

export default verifyJWTToken;
