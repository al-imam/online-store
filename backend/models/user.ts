import getProfile from "@/utility/getProfile";
import { Model, Schema, model, models, SchemaTypes } from "mongoose";
import { hashSync } from "bcryptjs";

type AvatarType = string | { bg: string; fg: string; char: string };

interface UserInterface {
  name: string;
  email: string;
  password: string;
  avatar: AvatarType;
  role: string;
}

const user = new Schema<UserInterface>(
  {
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
    },

    avatar: {
      type: SchemaTypes.Mixed,
      default: function () {
        return getProfile(typeof this.email === "string" ? this.email[0] : "u");
      },
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: { createdAt: "created", updatedAt: false } }
);

user.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = hashSync(this.password);
});

export default (models.User as Model<UserInterface>) ||
  model<UserInterface>("User", user);
