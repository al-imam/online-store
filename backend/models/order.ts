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

const order = new Schema<Prettify<OrderSchema>>(
  {
    address: {
      type: Types.ObjectId,
      required: true,
      ref: "Address",
    },

    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },

    order: [
      {
        product: {
          type: Types.ObjectId,
          required: true,
          ref: "Product",
        },

        name: {
          type: String,
          required: true,
        },

        quantity: {
          type: String,
          required: true,
        },

        imageURL: {
          type: String,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    payment: {
      id: { type: String, required: true },
      status: { type: String, required: true },
      tax: { type: Number, required: true },
      amount: { type: Number, required: true },
    },

    status: {
      type: String,
      enum: ["processing", "pending", "completed"] as const,
      default: "processing",
    },
  },
  { timestamps: { updatedAt: false, createdAt: "created" } }
);

export default (models.Order as Model<Prettify<OrderSchema>>) ||
  model("Order", order);
