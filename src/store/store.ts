import { TypedUseSelectorHook, useSelector } from "react-redux";

import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./reducers/modalSlice";
import playerSlice from "./reducers/playerSlice";
import gameSlice from "./reducers/gameSlice";
const store = configureStore({
  reducer: {
    modalSlice,
    playerSlice,
    gameSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat([]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
