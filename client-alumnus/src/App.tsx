// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/User/Login/Login';
import Home from './pages/Home/Home'
import PrivateRoute from './components/PrivateRoute'; 
import { AuthProvider } from './components/AuthContext';
import UserInfo from './pages/User/UserInfo/UserInfo';

const App: React.FC = () => {
  return (
    // <AuthProvider>
    //   <Router>
    //     <Routes>
    //       <Route path="/login" element={<Login />} />
    //       <Route element={<PrivateRoute />}>
    //         <Route path="/home" element={<Home />} />
    //         {/* 添加其他受保护的路由 */}
    //       </Route>
    //     </Routes>
    //   </Router>
    // </AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/user" element={<UserInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
