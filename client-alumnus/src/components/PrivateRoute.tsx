// src/components/PrivateRoute.tsx
//保护路由
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // 确保导入 AuthContext

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth(); // 从 AuthContext 中获取认证状态

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
