import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
  const isLogin = sessionStorage.getItem('token');
  return isLogin ? <Navigate to="/intro" /> : <Outlet />;
};

export default PublicRoute;
