import { createSlice, nanoid } from "@reduxjs/toolkit";

// Load data from localStorage
const userFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : [];
};

const initialState = {
  User: userFromLocalStorage(),
  isLoggedIn: userFromLocalStorage().length > 0, // Initialize isLoggedIn based on localStorage
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const user = {
        id: action.payload.id ? action.payload.id : nanoid(),
        name: action.payload.name,
        email: action.payload.email,
      };
      state.User.push(user);
      state.isLoggedIn = true; // Set isLoggedIn to true when a user logs in
      localStorage.setItem("user", JSON.stringify(state.User)); // Store user in localStorage
    },

    logout: (state) => {
      console.log("logout");

      state.User = []; // Clear the user data
      state.isLoggedIn = false; // Set isLoggedIn to false
      localStorage.removeItem("user"); // Remove user data from localStorage
    },
  },
});

export const { addUser, logout } = UserSlice.actions;
export default UserSlice.reducer;
