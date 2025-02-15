import React from 'react'
import {Outlet} from 'react-router-dom'

const TextPage = () => {
  return (
    <>
    <Outlet/>
    <h2>
      Upload your text here!
    </h2>
    </>
  )
};

export default TextPage;
