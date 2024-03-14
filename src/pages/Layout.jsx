import React from 'react'
import { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import Login from './Login'
const Layout = (props) => {
  const [searchKey, setsearchKey] = useState('')
  const Setsearch = (e)=>{
    setsearchKey(e)
  }

  return (
   <>
   <Header srch={Setsearch}/>
   <div className='layout-Block _flex flex-column'>
    {props?.isAuth?.UserToken ?  <Outlet context={searchKey}/> : <Login/>}
   </div>
   <Footer/>
   </>
  )
}

export default Layout