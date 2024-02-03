import React from 'react'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import Chart from '../Components/ChartComponent'
const Dashboard = () => {
 const  AddmissionData = [
    ["New Addmission tracker", "IX", "X", "XI", "XII"],
    ["Jan", 56, 50, 20,45],
    ["Dec", 70, 60, 25,54],
    ["Nov", 60, 120, 80, 54],
    ["Oct", 30, 54, 35, 54],
  ];

  const  AttendenceData = [
    ["Attendance", "percentage"],
    ["CLASS IX", 33],
    ["CLASS X", 26],
    ["CLASS XI", 22],
    ["CLASS XII", 10], // Below limit.
  ];

const attendenceOptions = {
    title: "Attendence Tacker",
    sliceVisibilityThreshold: 0.1,  // 20%
  };

const addmissionOption ={
  chart :{
    title:'New Addmission',
  }
} 

  return (
    <Container >
      <Row>
        <Col sm={12} className='upperContent'>
          <Stack gap={3} className='flex-sm-row'>
              <Col sm={4} xs={12}  className='border-2 dashboard-Card'>
                <b>Monthly Revenue $</b>
                <Col className='_flex justify-content-between m-0'><b className='m-0'>24144 $ </b><button className='default-btn'>Check Now</button></Col> 
              </Col>
              <Col sm={4} xs={12} className='border-2 dashboard-Card '>
               <b> Annual Revenue $</b>
               <Col className='_flex justify-content-between m-0'><b className='m-0'>2434344 $ </b><button className='default-btn'>Check Now</button></Col> 
                </Col>
              <Col sm={4} xs={12} className='border-2 dashboard-Card'>
                <b>Number of Student</b>
                <Col className='_flex justify-content-between m-0'><b className='m-0'>7289 </b><button className='default-btn'>Check Now</button></Col>
              </Col>
          </Stack>
        </Col>
        <Col sm={12}>
          <Stack gap={4} className='flex-sm-row'>
            <Col sm={8}>
              <Chart chartType="Bar" data={AddmissionData} dataoption={addmissionOption}/>
            </Col>
            <Col sm={4} className='border-2 dashboard-Card ms-2 text-center p-0'>
            <Chart chartType="PieChart" data={AttendenceData} dataoption={attendenceOptions}/>
            </Col>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default Dashboard