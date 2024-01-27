import { useState,  } from 'react'
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {GetLogin} from '../features/LoginSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SHA256 } from 'crypto-js';

const Login = () => {
  const navigate = useNavigate()
  const Dispath = useDispatch()
  const admin = {
    "email": "eve.holt@reqres.in",
    "password": "cityslicka"
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
    console.log(userData);
    setuserData({
      email:'',
      password:''
    })

    axios.post('https://reqres.in/api/login',userData)
    .then((res)=>{
      console.log(res);
      Dispath(GetLogin(res?.data?.token))
      /* cookies for UTC Time   */
       document.cookie = `Token=${res?.data?.token}; expires=${new Date(Date.now() +  5000).toUTCString()}; path='/'`
     /* indian time  */
      // const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      // const indianExpirationString = expirationDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
      // document.cookie = `AuthToken=${res?.data?.token}; expires=${indianExpirationString}; path='/'` 
      // console.log(expirationDate);
      navigate('/')
    })
    .catch((error)=>{
        console.log(error);
    })
  }



  return (
   <Container fluid>
    <Row className='login-block' gap={4}>
      <Col sm={7}></Col>
      <Col sm={5} className='_flex'>
        <form onSubmit={handleSubmit}>
        <p className='text-center fw-bolder fs-1'>Login Page</p>
        <input placeholder='Enter user name' name='email' value={userData?.email} onChange={handlechange}/>
        <input placeholder='Enter password' name="password" type='password' value={userData?.password} onChange={handlechange}/>
        <button type="submit" className="default-btn">Submit</button>
        </form>
      </Col>
    </Row>
   </Container>
  )
}

export default Login