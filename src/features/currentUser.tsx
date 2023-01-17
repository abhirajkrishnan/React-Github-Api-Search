import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
interface search {
  name: string;
  timeStamp: number;
}
const initialState: {
  username: string;
  userId: string;
  searches: search[];
  isLoggedIn: boolean;
} = {
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
      if (action.payload.searches) {
        state.searches = action.payload.searches;
      }
    },
    searchesByUser: (state, action) => {
      state.searches = action.payload.sort(
        (a: search, b: search) => b.timeStamp - a.timeStamp
      );
    },
  },
});

export const { currentLoggedInUser, searchesByUser } =
  currentLoggedInUserSlice.actions;
export default currentLoggedInUserSlice.reducer;
