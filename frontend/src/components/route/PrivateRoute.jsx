import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoute = () => {
  const isLogin = sessionStorage.getItem('token');
  return isLogin ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
