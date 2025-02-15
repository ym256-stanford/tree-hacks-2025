import React from 'react'
import {Outlet} from 'react-router-dom'

const UploadPage = () => {
  return (
    <>
    <Outlet/>
    <div>
      Upload your file here.
    </div>
    </>
  )
};

export default UploadPage;
