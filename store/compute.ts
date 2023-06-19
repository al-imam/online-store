import CartItemInterface from "$types/cartItemInterface";
import { createSelector } from "@reduxjs/toolkit";

export const compute = createSelector(
  [(state: { items: CartItemInterface[] }) => state.items],
  (items) => {
    const { total, unit } = items.reduce(
      (a, v) => ({
        unit: a.unit + v.quantity,
        total: a.total + v.price * v.quantity,
      }),
      { unit: 0, total: 0 }
    );

    const tax = (total / 100) * 5;

    return {
      total,
      unit,
      tax,
      totalWithTax: total + tax,
    };
  }
);
