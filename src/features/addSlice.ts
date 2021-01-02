import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { productType } from "../pages/index";

const initialState = {
  addedItems: [],
  total: 0,
};

// export const addToCartSlice = createSlice({
//   name: "addToCart",
//   initialState,
//   reducers: {
//     add(state, { payload }: PayloadAction<productType>): productType[] {
//       return {
//         state,
//         addedItems: [...state.addedItems, payload],
//       };
//     },
//   },
// });

export const { add } = addToCartSlice.actions;
export default addToCartSlice.reducer;
