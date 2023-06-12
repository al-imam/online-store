import { Model, Schema, model, models } from "mongoose";

const Product = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: [true, "product required name"],
    },

    description: {
      type: String,
      required: [true, "product required description"],
    },

    price: {
      type: Number,
      required: [true, "product required price"],
    },

    images: [
      {
        _id: false,
        id: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],

    seller: {
      type: String,
      required: [true, "product required seller"],
    },

    stock: {
      type: Number,
      required: [true, "product required stock"],
    },

    rating: { type: Number, default: 0 },

    reviews: [
      {
        rating: {
          type: Number,
          required: [true, "review required rating"],
        },

        comment: {
          type: String,
          required: [true, "review required comment"],
        },

        created: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "product required category"],
      enum: {
        values: [
          "electronics",
          "cameras",
          "laptops",
          "headphones",
          "sports",
          "toys",
          "beauty",
        ] as const,
        message: "select valid product category",
      },
    },
  },

  { timestamps: { createdAt: "created", updatedAt: false } }
);

export default (models.Product as Model<typeof Product>) ||
  model("Product", Product);
