import { Model, Schema, Types, model, models } from "mongoose";
import Prettify from "@/types/Prettify";

interface OrderSchema {
  address: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  order: {
    product: Schema.Types.ObjectId;
    name: string;
    quantity: number;
    imageURL: string;
    price: number;
  }[];
  payment: {
    id: string;
    status: string;
    tax: number;
    amount: number;
  };
  status: "processing" | "pending" | "completed";
  created: Date;
}
