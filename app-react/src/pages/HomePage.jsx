import React from 'react'
import {Outlet} from 'react-router-dom'

const HomePage = () => {
  return (
    <>
    <Outlet/>
    <div>
      Reading has never been easier!
    </div>
    </>
  )
}

export default HomePage
