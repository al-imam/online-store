import crypto from "crypto";

export default function () {
  return [4, 2, 2, 2, 6]
    .map((group) => crypto.randomBytes(group).toString("hex"))
    .join("-");
}
