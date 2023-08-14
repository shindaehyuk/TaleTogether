import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      sessionStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem('token', '');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
