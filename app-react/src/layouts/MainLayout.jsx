import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const MainLayout = () => {
  return (
    <>
    <Navbar/>
    <div>
        <Outlet/>
    </div>
    <h2>This on every page.</h2>

    </>
  )
}

export default MainLayout
