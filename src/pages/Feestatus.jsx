import React from 'react'
import { Col, Container, Row} from 'react-bootstrap'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { useSelector } from 'react-redux';

const Feestatus = () => {
  const UserInfo = useSelector((state)=>  state.crud.ViewUser)
  const date = new Date();
  let CurrDate = date.getDate()
  let CurrMonth = date.getMonth()+1;
  let CurrYear = date.getFullYear();
  console.log(CurrDate, CurrMonth, CurrYear );
  let join_Year =  UserInfo?.Joining_Date.split('-', 1);
  let join_Month =  UserInfo?.Joining_Date.split('-', 2);
  let join_Date =  UserInfo?.Joining_Date.split('-', 3)
  console.log();
  const fee_status = {
    student_info : '12-12-23',
   student_status : [
    {title:'Jan', status :'paid'},
    {title:'Feb', status :'paid'},
    {title:'Mar', status :'paid'},
    {title:'Apr', status :'unpaid'},
    {title:'May', status :'unpaid'},
    {title:'Jun', status :'unpaid'},
    {title:'Jul', status :'unpaid'},
    {title:'Aug', status :'unpaid'},
    {title:'Sep', status :'unpaid'},
    {title:'Oct', status :'unpaid'},
    {title:'Nov', status :'unpaid'},
    {title:'Dec', status :'unpaid'}
    ]
 } 

  return (
    <Container fluid>
      <Col>
        <h1>Fees Staus </h1>
      </Col>
      <Row>
        <Col sm={4}>
          dfhjkdshfjk
        </Col>
        <Col sm={8}>
          <Row>
            <Col>
              <p>Enroll : {UserInfo?.id}</p>
              <p>Name: {UserInfo?.S_Name}</p>
              <p> Class : {UserInfo?.S_Class}</p>
              <p>Fee Stattus : paid</p>
              <p>DOB :{UserInfo?.Date_of_Birth}</p>
            </Col>
            <Col>
              <p>Board : {UserInfo?.S_Board}</p>
              <p>Joining Date : {UserInfo?.Joining_Date}</p>
              <p> Contact NO : {UserInfo?.P_Contact}</p>
              <p>Address : {UserInfo?.Address}</p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col sm={12} className='_flex justify-content-start '>
         {fee_status.student_status.map((itm) =><div className='d-flex'>
            <p className='p-0 m-0'>{itm.title}</p>
            <div>
              {itm.status == 'paid' ? <CheckCircleOutlineOutlinedIcon color="success"/> : <div className='unpaid-fee'></div>}
            </div>
          </div>
          )}
          <button className='default-btn'>Receive Fee</button>
        </Col>
      </Row>
    </Container>
  )
}

export default Feestatus