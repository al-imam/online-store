import { create } from "zustand";
import { persist, subscribeWithSelector, combine } from "zustand/middleware";
import CartItemInterface from "@/types/cartItemInterface";
import { immer } from "zustand/middleware/immer";

interface StoreInterface {
  items: CartItemInterface[];
  unit: number;
  total: number;
  tax: number;
  totalWithTax: number;
  addItem(item: CartItemInterface): void;
  addQuantity(item: CartItemInterface): void;
  removeQuantity(item: CartItemInterface): void;
  deleteItem(id: string): void;
}

const useCart = create<
  StoreInterface,
  [
    ["zustand/persist", StoreInterface],
    ["zustand/subscribeWithSelector", never]
  ]
>(
  persist(
    subscribeWithSelector((set, get) => ({
      items: [],
      unit: 0,
      total: 0,
      tax: 0,
      totalWithTax: 0,

      addItem(item) {
        const { items, addQuantity } = get();

        const update = items.find((e) => e.id === item.id);

        if (update) return addQuantity(update);
        set((store) => ({ ...store, items: [...items, item] }));
      },

      deleteItem(id) {
        set((store) => ({
          ...store,
          items: store.items.filter((item) => item.id !== id),
        }));
      },

      addQuantity(item) {
        if (item && item.stock > item.quantity) {
          set((store) => ({
            ...store,
            items: store.items.map((el) => {
              if (el.id === item.id) {
                el.quantity++;
                return el;
              }
              return el;
            }),
          }));
        }
      },

      removeQuantity(item) {
        if (item.quantity > 1) {
          set((store) => ({
            ...store,
            items: store.items.map((el) => {
              if (el.id === item.id) {
                el.quantity--;
                return el;
              }
              return el;
            }),
          }));
        }
      },
    })),
    { name: "cart-items", skipHydration: true }
  )
);

useCart.subscribe(
  (store) => store.items,
  (items) => {
    useCart.setState((store) => ({
      ...store,
      ...items.reduce(
        (a, v) => ({
          unit: a.unit + v.quantity,
          total: a.total + v.price * v.quantity,
        }),
        { unit: 0, total: 0 }
      ),
    }));
  },
  { fireImmediately: true }
);

useCart.subscribe(
  (store) => store.total,
  (total) => {
    const tax = (total / 100) * 5;
    useCart.setState((store) => ({
      ...store,
      tax,
      totalWithTax: total + tax,
    }));
  },
  { fireImmediately: true }
);

export const useCounter = create(
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
            addItem(item: CartItemInterface) {
              const update = get().items.find((e) => e.id === item.id);

              if (update) return this.addQuantity(update);

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
          })
        )
      )
    ),
    { name: "cart" }
  )
);

export default useCart;
