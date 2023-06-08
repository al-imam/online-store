import { create } from "zustand";
import { persist, subscribeWithSelector, combine } from "zustand/middleware";
import CartItemInterface from "@/types/cartItemInterface";
import { immer } from "zustand/middleware/immer";

export const useCart = create(
  persist(
    subscribeWithSelector(
      immer(
        combine(
          {
            items: [] as CartItemInterface[],
            unit: 0,
            total: 0,
            tax: 0,
            totalWithTax: 0,
          },
          (set, get) => ({
            clearItems() {
              set((store) => {
                store.items = [];
              });
            },

            addItem(item: CartItemInterface) {
              const { addQuantity, items } = get() as ReturnType<typeof get> & {
                addQuantity: (item: CartItemInterface) => void;
              };

              const update = items.find((e) => e.id === item.id);
              if (update) return addQuantity(update);

              set((store) => {
                store.items.push(item);
              });
            },

            addQuantity(item: CartItemInterface) {
              const index = get().items.findIndex((e) => e.id === item.id);

              if (item.stock > item.quantity && index !== -1) {
                set((store) => {
                  store.items[index].quantity++;
                });
              }
            },

            removeQuantity(item: CartItemInterface) {
              const index = get().items.findIndex((e) => e.id === item.id);

              if (item.quantity > 1 && index !== -1) {
                set((store) => {
                  store.items[index].quantity--;
                });
              }
            },

            deleteItem(id: string) {
              set((store) => {
                store.items = store.items.filter((item) => item.id !== id);
              });
            },
          })
        )
      )
    ),
    { name: "cart" }
  )
);

useCart.subscribe(
  (store) => store.items,
  (items) => {
    useCart.setState((store) => {
      const { total, unit } = items.reduce(
        (a, v) => ({
          unit: a.unit + v.quantity,
          total: a.total + v.price * v.quantity,
        }),
        { unit: 0, total: 0 }
      );

      store.total = total;
      store.unit = unit;
      store.tax = (total / 100) * 5;
      store.totalWithTax = total + store.tax;
    });
  },
  { fireImmediately: true }
);

export default useCart;
