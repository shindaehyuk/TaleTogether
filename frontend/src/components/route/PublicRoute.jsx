import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
  const isLogin = useSelector((state) => state.userSlice.userState);
  if (!isLogin) {
    console.log('로그인이 필요한 기능입니다.');
  }
  return isLogin ? <Navigate to="/main" /> : <Outlet />;
};

export default PublicRoute;
