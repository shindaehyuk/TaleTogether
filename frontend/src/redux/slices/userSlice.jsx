import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
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
