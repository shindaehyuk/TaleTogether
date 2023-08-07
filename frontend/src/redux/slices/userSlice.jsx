import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userState: false,
  userId: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.userState = true;
      state.userId = action.payload.email;
    },
    logout: (state) => {
      state.userState = false;
      state.userId = '';
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
