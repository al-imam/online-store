import { productSlice } from "$store/productSlice";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const store = configureStore({
  reducer: persistReducer(
    { key: "redux-local", storage },
    productSlice.reducer
  ),
  middleware: (middlewares) =>
    middlewares({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
