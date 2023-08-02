import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userState: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.userState = true;
    },
    logout: (state) => {
      state.userState = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
