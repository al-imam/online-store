import getProfile from "@/utility/getProfile";
import { Model, Schema, model, models } from "mongoose";
import { hashSync } from "bcryptjs";
import { UserInterface } from "@/types/UserInterface";

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
      type: Schema.Types.Mixed,
      default: function () {
        return getProfile(this.name[0]);
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
