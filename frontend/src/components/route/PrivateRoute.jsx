import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isLogin = useSelector((state) => state.userSlice.token);
  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
