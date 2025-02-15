import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const MainLayout = () => {
  return (
    <div>
      <Outlet />
      <Outlet />
    </div>
  );
};

export default MainLayout;
export default MainLayout;
