import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");
const storedToken = localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: storedToken ? true : false,

    user:
      storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null,

    token: storedToken ? storedToken : null,
  },

  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
