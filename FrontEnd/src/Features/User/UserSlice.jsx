import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  User: [
    {
      id: "1",
      name: "John Doe",
      email: "a@a.com",
    },
  ],
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
    },
    removeUser: (state, action) => {
      state.User = state.User.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { addUser, removeUser } = UserSlice.actions;
export default UserSlice.reducer;
