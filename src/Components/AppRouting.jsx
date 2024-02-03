import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import StudentList from '../pages/StudentList';
import ViewUser from './ViewUser';
import AsyncThunkEx from '../Components/AsyncThunkEx';
import Layout from '../pages/Layout';
import Dashboard from '../pages/Dashboard';
import Exam from '../pages/Exam';
import Feestatus from '../pages/Feestatus';
import ImportantDate from '../pages/ImportantDate'
import Login from '../pages/Login';

const AppRouting = () => {
    const User_Auth = useSelector((state)=> state.Auth)
  return (
   <>
   <BrowserRouter>
      <Routes>
          <Route path='sk' element={<Layout isAuth={User_Auth}/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="studentlist" element={<StudentList/>}/>
          <Route path="view" element={<ViewUser/>}/>
          <Route path="exam" element={<Exam/>}/>
          <Route path="importantDate" element={<ImportantDate/>}/>
          <Route path="feestatus" element={<Feestatus/>}/>
          <Route path="reduxAsyncthunk" element={<AsyncThunkEx/>}/>
          </Route>  
          {User_Auth ? <Route path="/" element={<Login/>}/> : ''}   
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default AppRouting