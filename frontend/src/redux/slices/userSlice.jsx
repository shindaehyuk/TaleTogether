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
      sessionStorage.setItem('token', action.payload.token);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
      sessionStorage.setItem('activeLinkIndex', 0);
    },
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem('token', '');
      localStorage.removeItem('refreshToken', '');
      sessionStorage.removeItem('activeLinkIndex', '');
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
