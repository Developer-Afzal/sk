import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Login from './Login'
const Layout = (props) => {
  return (
   <>
   <Header/>
   <div className='layout-Block _flex flex-column'>
    {props?.isAuth?.UserToken ?  <Outlet/> : <Login/>}
   </div>
   <Footer/>
   </>
  )
}

export default Layout