import { Model, Schema, model, models } from "mongoose";

interface AddressInterface {
  street: string;
  city: string;
  state: string;
  zip: number;
  phone: number;
  country: string;
}

const address = new Schema<AddressInterface>(
  {
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

export default (models.Address as Model<AddressInterface>) ||
  model<AddressInterface>("Address", address);
