import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  email: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      sessionStorage.setItem('token', action.payload);
      sessionStorage.setItem('email', 'xodnjs8287@naver.com');
    },
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem('token', '');
      sessionStorage.removeItem('email', '');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
