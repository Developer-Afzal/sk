import React from 'react'
import { Container, Col, Row } from 'react-bootstrap'

const Exam = () => {
  return (
   <Container fluid>
      <Row>
        <Col xs={12} sm={6}>Unit Test Result</Col>
        <Col xs={12}  sm={6}></Col>
      </Row>
      <Row>
        <Col xs={12}  sm={6}>Quarterly Exam Result</Col>
        <Col xs={12}  sm={6}>Annual Exam Result</Col>
      </Row>
   </Container>
  )
}

export default Exam