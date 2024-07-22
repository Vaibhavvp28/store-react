import { createSlice } from "@reduxjs/toolkit";

const errors = {};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(sessionStorage.getItem("authUser")) || {
      name: "",
      password: "",
      image: "",
      authUser: false,
    },
  },

  reducers: {
    login(state, action) {
      const userId = action.payload;
      const userValidation = /^[A-Za-z]{4,10}$/i.test(userId.name);
      const passwordValidation =
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{4,10}$/i.test(
          userId.password
        );
      state.user = userId;

      if (userId.name === "") {
        errors.name = "Name is required";
      } else if (userId.name.length > 4) {
        errors.name = "";
      } else {
        errors.name = "Please enter valid name";
      }

      if (userId.password === "") {
        errors.password = "Password is required";
      } else if (userId.password !== passwordValidation) {
        errors.password = "Enter a strong password!";
      }

      if (!userValidation || !passwordValidation) {
        state.user.authUser = false;
      } else {
        errors.name = "";
        errors.password = "";
        state.user.authUser = true;
        const saveState = JSON.stringify(userId);
        sessionStorage.setItem("authUser", saveState);
      }
    },
    logout(state) {
      state.user = {
        name: "",
        password: "",
        image: "",
        authUser: false,
      };
      sessionStorage.clear();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
export { errors };
