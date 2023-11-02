import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";

const combinedReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = undefined;
  }

  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
