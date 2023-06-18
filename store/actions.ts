import { productSlice } from "$store/productSlice";

export const { addItem, addQuantity, deleteItem, removeQuantity, clear } =
  productSlice.actions;
