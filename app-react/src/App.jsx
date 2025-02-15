import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import UploadPage from './pages/UploadPage'
import TextPage from './pages/TextPage'

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path = '/' element={<MainLayout/>}>
    <Route index element={<HomePage/>}/>,
    <Route path = '/upload' element = {<UploadPage/>}/>,
    <Route  path = '/text' element = {<TextPage/>}/>
 </Route>
));

function App() {

  return (
    <RouterProvider router = {router}/>
  );
}

export default App
