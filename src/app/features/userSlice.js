import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user"),
  authReady: false,
  isPending: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      localStorage.setItem("user", payload);
      state.user = payload;
    },
    logout: (state, { payload }) => {
      localStorage.removeItem("user");
    },
    authReadyAct: (state) => {
      state.authReady = true;
    },
    setIsPending: (state, { payload }) => {
      state.isPending = payload;
    },
  },
});

export const { login, logout, authReadyAct, setIsPending } = userSlice.actions;
export default userSlice.reducer;
