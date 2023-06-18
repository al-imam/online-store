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

    addItem: function (state, action: PayloadAction<CartItemInterface>) {
      const index = state.items.findIndex((e) => e.id === action.payload.id);

      if (index === -1) {
        state.items.push(action.payload);
        return;
      }

      if (state.items[index].stock > state.items[index].quantity) {
        state.items[index].quantity++;
      }
    },

    addQuantity: function (state, action: PayloadAction<string>) {
      const index = state.items.findIndex((e) => e.id === action.payload);

      if (
        index !== -1 &&
        state.items[index].stock > state.items[index].quantity
      ) {
        state.items[index].quantity++;
      }
    },

    removeQuantity: function (state, action: PayloadAction<string>) {
      const index = state.items.findIndex((e) => e.id === action.payload);

      if (index !== -1 && state.items[index].quantity > 1) {
        state.items[index].quantity--;
      }
    },
  },
});
