import { combineReducers } from "@reduxjs/toolkit";
import addToCartReducer from "../features/addSlice";

const rootReducer = combineReducers({
  addToCart: addToCartReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
