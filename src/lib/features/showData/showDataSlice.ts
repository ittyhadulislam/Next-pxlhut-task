// import { createSlice } from "@reduxjs/toolkit";

// const showDetailsReducer = createSlice({
//   name: "showDetails",
//   initialState: {
//     getData: null,
//   },
//   reducers: {
//     setShowDetails(
//       state,
//       action: { payload: { key: keyof typeof state; value: any } }
//     ) {
//       const { key, value } = action.payload;
//       state[key] = value;
//     },
//   },
// });

// export const { setShowDetails } = showDetailsReducer.actions;
// export default showDetailsReducer.reducer;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ShowDetailsState = {
  getData: {
    fullName: string;
    email: string;
    phoneNo: string;
    streetAddress: string;
    city: string;
    zipCode: string;
    userName: string;
    password: string;
  } | null;
};

const initialState: ShowDetailsState = {
  getData: null,
};

const showDetailsReducer = createSlice({
  name: "showDetails",
  initialState,
  reducers: {
    setShowDetails(
      state,
      action: PayloadAction<{ key: keyof ShowDetailsState; value: ShowDetailsState[keyof ShowDetailsState] }>
    ) {
      const { key, value } = action.payload;
      state[key] = value;
    },
  },
});

export const { setShowDetails } = showDetailsReducer.actions;
export default showDetailsReducer.reducer;