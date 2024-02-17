import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const ViewUser = () => {
  const UserList = useSelector((state) => state.crud.users);
  const FeeStatus = useSelector((state)=> state.fee)
  const [ViewSingleUser, setViewSingleUser] = useState();
  const navigate = useNavigate()
  const Param = useParams();
  useEffect(()=>{
   let singleUser =  UserList.filter((itm)=> itm.id == Param.userId)
    setViewSingleUser(singleUser[0])
  },[])
  return (
      <Container className='view-block'>
        <Col xs sm={{span: 4, offset: 3 }} className='text-center view-heading'>
          Student Details
        </Col>
        <Col xs sm={12} >
          <Row>
          <Col xs={{span: 4, offset: 2 }} sm={{span: 2, offset: 4 }} className='p-0'>Student Name</Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.S_Name}</Col>
          <Col xs={{span: 4, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'>Date of Birth</Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.Date_of_Birth}</Col>
          <Col xs={{span: 4, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'>Board</Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.S_Board}</Col>
          <Col xs={{span: 4, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'>Class</Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.S_Class}</Col>
          <Col xs={{span: 4, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'>Coaching Timing</Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.Coaching_Time}</Col>
          <Col xs={{span: 4, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'>Fees</Col>
          <Col xs sm={6} className='p-0'>{ViewSingleUser?.Fee}</Col>
          <Col xs={{span: 4, offset: 2 }} sm={{span: 2, offset: 4 }} className=' p-0'>Fees Status</Col>
          <Col xs sm={6} className='p-0'>Paid</Col>
            <Col xs={{span: 4, offset:2 }} sm={{span: 2, offset: 4 }} className=' py-3 px-0'><button className='default-btn' onClick={()=> navigate(`/sk/feestatus/${ViewSingleUser?.id}`)}>Check</button><button className='default-btn' onClick={()=> navigate(-1)}>Back</button></Col>
          </Row>
        </Col>
      
      </Container>
  )
}

export default ViewUser