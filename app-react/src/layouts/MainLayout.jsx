import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <h1>
        <Outlet/>
        <h2>This on every page.</h2>
    </h1>
  )
}

export default MainLayout
