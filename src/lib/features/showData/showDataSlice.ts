import { createSlice } from "@reduxjs/toolkit";

const showDetailsReducer = createSlice({
  name: "showDetails",
  initialState: {
    getData: null,
  },
  reducers: {
    setShowDetails(
      state,
      action: { payload: { key: keyof typeof state; value: any } }
    ) {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setShowDetails } = showDetailsReducer.actions;
export default showDetailsReducer.reducer;
