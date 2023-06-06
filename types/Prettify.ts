import { Schema } from "mongoose";

type Prettify<T extends object> = {
  [Key in keyof T]: T[Key];
} & {};

export type PM<T extends object> = {
  [Key in keyof T]: T[Key] extends Schema.Types.ObjectId | Date
    ? T[Key]
    : T[Key] extends object
    ? PM<T[Key]>
    : T[Key];
} & {};

export default Prettify;
