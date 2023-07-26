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
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
