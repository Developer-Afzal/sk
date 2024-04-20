import { useState,  } from 'react'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {GetLogin} from '../features/LoginSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SHA256 } from 'crypto-js';
import Snackbarcompo from '../Components/Snackbarcompo';

const Login = () => {
  const [snackBar, setsnackBar] = React.useState({Click:false, message:'', msgType:''});
  const navigate = useNavigate()
  const Dispath = useDispatch()
  const admin = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
}

const openSnackBar = (value)=>{
  setsnackBar((prevState)=>({
    ...prevState,
    Click:value.Click,
    message:value.msg,
    msgType:'error'
  }))
 }
  const [userData, setuserData]= useState({
    email:'',
    password:''
  })
  const [hashedValue, setHashedValue] = useState('');

  const handlechange = (e)=>{
    setuserData({...userData, [e.target.name]:e.target.value});
    const hashed = SHA256(userData).toString();
    setHashedValue(hashed);
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post('https://reqres.in/api/login',userData)
    .then((res)=>{
      Dispath(GetLogin(res?.data?.token))
      /* cookies for UTC Time   */
      //  document.cookie = `Token=${res?.data?.token}; expires=${new Date(Date.now() +  5000).toUTCString()}; path='/'`
     /* indian time  */
      // const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      // const indianExpirationString = expirationDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      // document.cookie = `AuthToken=${res?.data?.token}; expires=${indianExpirationString}; path='/'` 
      // console.log(expirationDate);
      setuserData({
        email:'',
        password:''
      })
  
      navigate('/sk')
    })
    .catch((error)=>{
      openSnackBar({Click:true, msg:error?.response?.data?.error})
    })
  }



  return (
   <Container fluid>
    <Row className='login-block' gap={4}>
      <Col sm={{span:5, offset:7}} className='_flex'>
        <form onSubmit={handleSubmit}>
        <p className='text-center fw-bolder fs-1'>Login Page</p>
        <input placeholder='Enter user name' name='email' value={userData?.email} onChange={handlechange}/>
        <input placeholder='Enter password' name="password" type='password' value={userData?.password} onChange={handlechange}/>
        <button type="submit" className="default-btn">Submit</button>
        </form>
      </Col>
    </Row>
    <Snackbarcompo data={snackBar} openSnackBar={openSnackBar}/>
   </Container>
  )
}

export default Login