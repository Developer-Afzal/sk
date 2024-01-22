import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

const Layout = () => {
  return (
   <>
   <Header/>
   <div className='StudentList-Block'>
   <Outlet/>
   </div>
   <Footer/>
   </>
  )
}

export default Layout