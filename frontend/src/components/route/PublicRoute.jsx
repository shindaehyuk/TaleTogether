import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
  const isLogin = useSelector((state) => state.userSlice.token);
  return isLogin ? <Navigate to="/intro" /> : <Outlet />;
};

export default PublicRoute;
