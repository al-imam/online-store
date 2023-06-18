import CartItemInterface from "$types/cartItemInterface";
import { TypedUseSelectorHook, useSelector as useRS } from "react-redux";

export const useSelector: TypedUseSelectorHook<{ items: CartItemInterface[] }> =
  useRS;
