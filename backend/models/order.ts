import { Model, Schema, Types, model, models } from "mongoose";
import Prettify from "@/types/Prettify";

interface OrderSchema {
  address: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  seller: Schema.Types.ObjectId;
  order: {
    product: Schema.Types.ObjectId;
    name: string;
    quantity: number;
    imageURL: string;
    price: number;
  }[];
  payment: {
    id: string;
    status: "no_payment_required" | "paid" | "unpaid";
    tax: number;
    amount: number;
  };
  status: "processing" | "pending" | "completed";
}

const order = new Schema<Prettify<OrderSchema>>(
  {
    address: {
      type: Types.ObjectId,
      required: true,
      ref: "Address",
    },

    seller: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },

    user: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },

    order: [
      {
        _id: false,

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
          type: Number,
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
      status: {
        type: String,
        enum: ["no_payment_required", "paid", "unpaid"] as const,
        required: true,
      },
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
