import filter from './filterSlice';
import search from './searchSlice';
import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist"; 
import { persistedAuthReducer } from "./authSlice";

const rootReducer = {
    filter,
    search,
    user: persistedAuthReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false
  })
});

export { store };

export const persistor = persistStore(store); 