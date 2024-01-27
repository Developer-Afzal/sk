import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import Chart from '../Components/ChartComponent'
const Dashboard = () => {
  return (
    <Container >
      <Row>
        <Col sm={12}className='upperContent'>
          <Stack gap={3} className='flex-sm-row'>
              <Col sm={4} xs={12}  className='border-2 dashboard-Card'>
                <b>Monthly Fees $</b>
                <Col className='_flex justify-content-between m-0'><b className='m-0'>24144 $ </b><button className='default-btn'>Check Now</button></Col> 
              </Col>
              <Col sm={4} xs={12} className='border-2 dashboard-Card '>
               <b> Annual Revenue $</b>
               <Col className='_flex justify-content-between m-0'><b className='m-0'>24144 $ </b><button className='default-btn'>Check Now</button></Col> 
                </Col>
              <Col sm={4} xs={12} className='border-2 dashboard-Card'>
                <b>Number of Student</b>
                <Col className='_flex justify-content-between m-0'><b className='m-0'>2284289572893 </b><button className='default-btn'>Check Now</button></Col>
              </Col>
          </Stack>
        </Col>
        <Col sm={12}>
          <Stack gap={4} className='flex-sm-row'>
            <Col sm={8}>
              <Chart/>
            </Col>
            <Col sm={4} className='border-2 dashboard-Card ms-2 text-center'>
              <b>New Registration</b>
              <div className='Dashboardreg-count _flex'>
                56%
              </div>
              <p>
              <button className='default-btn'>Check Now</button>
              </p>
            </Col>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard