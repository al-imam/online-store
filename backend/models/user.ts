import getProfile from "@/utility/getProfile";
import { Model, Schema, model, models, SchemaTypes } from "mongoose";

type AvatarType = string | { bg: string; fg: string; char: string };

interface UserInterface {
  name: string;
  email: string;
  password: string;
  avatar: AvatarType;
  role: string;
}

const userSchema = new Schema<UserInterface>({
  name: {
    type: String,
    required: [true, "name required for account"],
  },
  email: {
    type: String,
    required: [true, "name required for account"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password required for account"],
    select: false,
  },
  avatar: {
    type: SchemaTypes.Mixed,
    default: function () {
      return getProfile(typeof this.email === "string" ? this.email[0] : "U");
    },
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});
