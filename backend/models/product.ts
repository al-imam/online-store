import { Schema, model, models } from "mongoose";

const Product = new Schema(
  {
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
        product_id: String,
        url: String,
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

    rating: {
      type: Number,
      default: 0,
    },

    reviews: [
      {
        rating: {
          type: Number,
          required: [true, "reviews required rating"],
        },

        comment: {
          type: String,
          required: [true, "reviews required comment"],
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
        values: ["electronics", "cameras", "laptops", "headphones", "sports"],
        message: "select valid product category",
      },
    },
  },

  { timestamps: { createdAt: "created" } }
);

export default model("Product", Product);
