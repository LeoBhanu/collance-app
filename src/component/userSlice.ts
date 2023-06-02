import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User, UserStateType } from "../types";
import { defaultUserValue } from "../util";


const initialState: UserStateType = {
  users: [],
  isEditUser: false,
  editUserData: defaultUserValue,
  selectedUserIndex: -1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    deleteUser: (state, action: PayloadAction<number>) => {
      state.users.splice(action.payload, 1)
    },
    selectUser: (
      state,
      action: PayloadAction<{ userData: User; index: number }>
    ) => {
      state.isEditUser = true;
      state.editUserData = action.payload.userData;
      state.selectedUserIndex = action.payload.index;
    },
    editUser: (state, action: PayloadAction<User>) => {
      state.isEditUser = false;
      state.users[state.selectedUserIndex] = action.payload
      state.selectedUserIndex = -1;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, selectUser, editUser } = userSlice.actions;

export default userSlice.reducer;
