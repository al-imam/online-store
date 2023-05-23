import { Model, Schema, model, models } from "mongoose";

const userSchema = new Schema({
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
    id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
});
