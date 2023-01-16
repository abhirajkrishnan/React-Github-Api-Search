import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
const initialState = {
  username: "",
  userId: "",
  searches: [],
  isLoggedIn: false,
};

const currentLoggedInUserSlice = createSlice({
  name: "currentLoggedInUser",
  initialState,
  reducers: {
    currentLoggedInUser: (state, action) => {
      state.username = action.payload.userinfo;
      state.userId = action.payload.userId;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    searchesByUser: (state, action) => {
      state.searches = action.payload;
    },
  },
});

export const { currentLoggedInUser, searchesByUser } =
  currentLoggedInUserSlice.actions;
export default currentLoggedInUserSlice.reducer;
