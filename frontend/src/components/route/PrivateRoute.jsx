import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isLogin = useSelector((state) => state.userSlice.userState);
  if (!isLogin) {
    console.log('로그인이 필요한 기능입니다.');
  }
  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
