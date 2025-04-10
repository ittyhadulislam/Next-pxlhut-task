import { configureStore } from "@reduxjs/toolkit";
import showDetailsReducer from "./features/showData/showDataSlice";

const store = configureStore({
  reducer: {
    showDetails: showDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
