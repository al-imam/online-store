import { ObjectId } from "mongoose";

export type AvatarType = string | { bg: string; fg: string; char: string };

export interface UserInterface {
  name: string;
  email: string;
  password: string;
  avatar: AvatarType;
  role: string;
}

export interface UserInterfaceWithId extends UserInterface {
  _id: ObjectId;
}
