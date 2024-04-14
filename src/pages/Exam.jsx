import React, { useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'

const Exam = () => {

  const [loading, setloading] = useState(false)

  const fetchData = async () => {
    // Simulate fetching data asynchronously with setTimeout
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = ['item1', 'item2', 'item3']; // Static data
        resolve(data);
      }, 2000); // Simulate a delay of 1 second
    });
  };
  

  const processData = async () => {
    try {
      const data = await fetchData();
      // Process data further if needed
    } catch (error) {
      // console.error('Error fetching data:', error);
    }
  };
  
  processData();
 
  return (
   <Container fluid>
    <h1>This page is inProgress</h1>

      {/* <Row>
        <Col xs={12} sm={6}>Unit Test Result</Col>
        <Col xs={12}  sm={6}></Col>
      </Row>
      <Row>
        <Col xs={12}  sm={6}>Quarterly Exam Result</Col>
        <Col xs={12}  sm={6}>Annual Exam Result</Col>
      </Row> */}
   </Container>
  )
}

export default Exam