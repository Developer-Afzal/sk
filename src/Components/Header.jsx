import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import Drawer from './Drawer'

const Header = ({srch}) => {
  const [a, seta] = useState(false);
  const navigate = useNavigate()
  const changeHandle = (e)=>{
    navigate('/sk/studentlist')
    if(!a){
      seta(true);
      setTimeout(() => {
        srch(e.target.value)
        seta(false)
      }, 1000);
     
    }
    // srch(e.target.value)
  }

  return (
    <Container fluid className='position-sticky top-0 z-3 '>
          <Row className='header-block'>
            <Col sm={1} xs={2}>
             <Drawer/>
            </Col>
            <Col xs={10} sm={4}  className='_flex logo-heading'>
               <Link to="/sk" className='link'>S K Coaching Center</Link> 
            </Col>
            <Col sm={5} className='_flex d-none d-sm-flex'>
              <input placeholder='Search Student' className='header-input' onChange={changeHandle} />
            </Col>
            <Col xs={2} className='_flex d-none d-sm-flex'>
              Admin
            </Col>
          </Row>
    </Container>
 
  )
}

export default Header