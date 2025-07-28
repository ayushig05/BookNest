import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("token"),
  role: localStorage.getItem("role") || "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      if (action.payload?.role) {
        state.role = action.payload.role;
        localStorage.setItem("role", action.payload.role);
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = "";
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("role");
    },
    changeRole: (state, action) => {
      state.role = action.payload;
      localStorage.setItem("role", action.payload);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
