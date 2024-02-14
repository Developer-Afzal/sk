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
   <BrowserRouter >
      <Routes>
          <Route element={<Layout isAuth={User_Auth}/>}>
          <Route path='sk' element={<Dashboard/>}/>
          <Route path="sk/studentlist" element={<StudentList/>}/>
          <Route path="sk/studentlist/view" element={<ViewUser/>}/>
          <Route path="sk/exam" element={<Exam/>}/>
          <Route path="sk/importantDate" element={<ImportantDate/>}/>
          <Route path="sk/feestatus" element={<Feestatus/>}/>
          <Route path="sk/feestatus/:userId" element={<Feestatus/>}/>
          <Route path="reduxAsyncthunk" element={<AsyncThunkEx/>}/>
          </Route>  
          {User_Auth ? <Route path="sk" element={<Login/>}/> : ''}   
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default AppRouting