import { Model, Schema, model, models } from "mongoose";
import AddressInterface from "@/types/AddressInterface";

interface AI extends AddressInterface {
  user: Schema.Types.ObjectId;
}

const address = new Schema<AI>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "only user can create address!"],
    },
    street: {
      type: String,
      required: [true, "street required for address"],
    },
    city: {
      type: String,
      required: [true, "city required for address"],
    },
    state: {
      type: String,
      required: [true, "state required for address"],
    },
    zip: {
      type: Number,
      required: [true, "zip required for address"],
    },
    phone: {
      type: Number,
      required: [true, "phone required for address"],
    },
    country: {
      type: String,
      required: [true, "country required for address"],
    },
  },
  { timestamps: { createdAt: "created", updatedAt: false } }
);

export default (models.Address as Model<AI>) ||
  model<AddressInterface>("Address", address);
