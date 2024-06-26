import { createSlice } from "@reduxjs/toolkit";
import login from "../services/auth/login";
import { getLocalStorage, removeLocalStorage } from "../utils/localStorage";
import { deleteCookies, getCookies } from "../utils/cookies";
import { auth } from "../utils/auth";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: getLocalStorage("loginData"),
  token: getCookies("token"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: (state) => {
      state.user = null;
      state.token = null;
      deleteCookies("token");
      removeLocalStorage("loginData");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { res, token } = action.payload;
        const decoded = jwtDecode(token);
        auth(token, res, decoded.exp);
        state.loading = false;
        state.user = action.payload.res;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
