import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Container, Col, Row } from 'react-bootstrap'
import { Typography } from '@mui/material'

const ViewUser = () => {
  const ViewSingleUser = useSelector((state) => state.crud.ViewUser);
  const navigate = useNavigate()
  return (
    <div className='_flex view-block'>
      <h1>Student Details</h1>
      <Container>
        <Row>
        <Col sm={4} className='offset-sm-2'>
          <Typography>
            Student Name : {ViewSingleUser?.S_Name}
          </Typography>
          <Typography>
            Date of Birth : {ViewSingleUser?.Date_of_Birth}
          </Typography>
          <Typography>
          Student Father's Name : {ViewSingleUser?.S_Fname}
          </Typography>
          <Typography>
          Student Mother's Name : {ViewSingleUser?.S_Mname}
          </Typography>
        </Col>
        <Col sm={4}>
        <Typography>
          Student Class : {ViewSingleUser?.S_Class}
          </Typography>
          <Typography>
            Board : {ViewSingleUser?.Board}
          </Typography>
        </Col>
        </Row>
      </Container>
      <button className='default-btn' onClick={()=> navigate('/')}>Back</button>
    </div>
  )
}

export default ViewUser