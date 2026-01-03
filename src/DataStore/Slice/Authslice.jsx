

import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: storedToken ? true : false,
    user: storedUser && storedUser !== "undefined" ? JSON.parse(storedUser) : null,
    token: storedToken || null,
  },
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;

      if (user) {
        state.user = user;
        localStorage.setItem("user", JSON.stringify(user));
      }

      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        localStorage.setItem("token", token);
      }
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },

    updateUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
