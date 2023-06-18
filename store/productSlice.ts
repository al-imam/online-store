import CartItemInterface from "$types/cartItemInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    items: [] as CartItemInterface[],
  },
  reducers: {
    clear: function (state) {
      state.items = [];
    },
  },
});
