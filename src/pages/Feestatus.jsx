import React, { useEffect, useState } from 'react'
import { Col, Container, Row} from 'react-bootstrap'
import Stack from '@mui/material/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import ViewIcon from '../Images/view.png'
import { Read } from '../features/crudSlice';
import {AcceptFee,} from '../features/StdfeeSlice'
import {useForm} from 'react-hook-form'
import Snackbarcompo from '../Components/Snackbarcompo';
import Pagination from '@mui/material/Pagination';
const Feestatus = () => {
  const userData = useSelector((state)=> state.crud.users)
  const FeeData = useSelector((state)=> state.fees)
  const userId  = useParams();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [openForm, setOpenForm] = useState(false)
  const form =  useForm();
  const {register, handleSubmit, setValue} = form;
  const [showmonth, setShowMonth] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage_Records, setperPage_Records] = useState(5)
  const [Startpage, setStartPage] = useState(0)
  const [EndPage, setEndPage] = useState(5)
  const [snackBar, setsnackBar] = React.useState({Click:false, message:'', msgType:''});
  const [UserInfo, setUserInfo] = useState()
  useEffect(()=>{
    if(userId){
      let singleStd = userData.filter((itm)=> itm.id == userId?.userId);
      setUserInfo(singleStd[0]);
    }
  },[userId?.userId])

  const date = new Date();
  let currMonth = date.toLocaleString('default', { month: 'short' })
  const checkStdfee = (value)=>{
    let u_data = FeeData[currMonth].map(itm => itm.id)
    if(u_data.includes(value)){
      return 'Paid'
    }else{
      return 'Unpaid'
    }
  }


  const getfeeStatus = (value)=>{
    let singleData = FeeData[value].filter(itm => itm.id === userId?.userId )
    console.log(singleData);
    if(singleData != ''){
      return 'paid'
    }
    
  //  let data =  FeeData[`${value}`]
  //   let getVal =  data.filter((itm)=> itm.id == userId?.userId)
  //   console.log(getVal);
  //   return getVal[0]?.fee
};



 const AcceptFees = ()=>{
  setOpenForm(true)
        setValue('Enroll',UserInfo?.id);
        setValue('S_Name',UserInfo?.S_Name);
        setValue('S_Class',UserInfo?.S_Class);
        setValue('Board',UserInfo?.S_Board);
        setValue('month','');
        setValue('AMT',UserInfo?.Fee);
 }

 const handleform = (data)=>{
  let {Enroll, month} = data;
  let item = FeeData[`${month}`].find(itm => itm.id == data.Enroll)
    // console.log(item)
    let StatusData = {Status:[{id: Enroll, month:month, fee:'paid' }]}
    let curr = UserInfo
    console.log({...UserInfo, ...StatusData});
    if(item){
      openSnackBar(true)
    } else{
      dispath(AcceptFee({Enroll,month}));
      setOpenForm(false);
      setsnackBar((prevState)=>({
        ...prevState,
        Click:true,
        message:'Fee accepted successfully',
        msgType:'success'
      }))
    } 
 }

 const openSnackBar = (value)=>{
  setsnackBar((prevState)=>({
    ...prevState,
    Click:value,
    message:'Fee already paid for this month',
    msgType:'error'
  }))
 }

 const handlePageChange = (e,value)=>{ 
  setCurrentPage(value)
  let EndPosition
  let StartPosition
  if(value > 1){
    EndPosition = value * perPage_Records;
    StartPosition = EndPosition - perPage_Records;
    setStartPage(StartPosition);
    setEndPage(EndPosition)
  }else {
    setStartPage(0);
    setEndPage(perPage_Records)
  }
}

  return (
  <Container fluid className='m-0 p-0'>
    <Stack  className="_flex pt-2 px-2" direction="row">
    {!userId?.userId ? <h4 className='heading'>Fee Status</h4> : <h4 className='heading'>Student Info</h4>}
    <button className='default-btn ms-auto' onClick={AcceptFees }>Accept Fee</button>
    </Stack>
    {!userId?.userId && !openForm ? <>
    <Container fluid className='table-block p-0'>
         <table>
            <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th className='text-center'>Date of Birth</th>
                  <th className='text-center'>Class</th>
                  <th className='text-center'>Board</th>
                  <th className='text-center'>Fee</th>
                  <th className='text-center'>Status</th>
                  <th className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
              {userData.slice(Startpage,EndPage).map((itm)=> <tr key={itm.id}>
                <td>{itm.id} </td>
                <td>{itm.S_Name} </td>
                <td className='text-center'>{itm.Date_of_Birth} </td>
                <td className='text-center'>{itm.S_Class}</td>
                <td className='text-center'>{itm.S_Board}</td>
                <td className='text-center'>{itm.Fee}</td>
                <td className='text-center'>{checkStdfee(itm.id)}</td>
                <td className='text-center'>
                <img className='icons' src={ViewIcon}  alt="View" onClick={()=> {navigate(`/sk/feestatus/${itm.id}`); }}/>
                </td>
              </tr>)}
            </tbody>
          </table> 
    </Container>
    <Stack spacing={2} className=' mt-2 pe-3' direction='row' justifyContent="flex-end">
      <Pagination page={currentPage} siblingCount={2} count={Math.ceil(userData.length/5)} onChange={handlePageChange} className='pagination'/>
    </Stack> </>:!openForm && userId?.userId ?  
    <Row className='p-0 m-2'>
      <Col sm={12} md={4} className='text-center'>
          <img className='w-75' src="https://img.freepik.com/free-vector/smiling-boy-portrait-casual-clothing-cartoon-style-kid-avatar-happy-teenager-vector-character_90220-2150.jpg?w=740&t=st=1707826921~exp=1707827521~hmac=16bf803ad5c58224d308ea319511b317fda49fbe874035f5207b3eab16d68648"  />
      </Col>
      <Col sm={8} className='_flex align-items-start'>
       <Col sm={6} className='ps-sm-5'>
          <p> Roll No  : {UserInfo?.id}</p>
          <p> Name : {UserInfo?.S_Name}</p>
          <p> Class : {UserInfo?.S_Class}</p>
          <p> Board : {UserInfo?.S_Board}</p>
          <p> Fee : {UserInfo?.Fee}</p>
          <p> Joining Date : {UserInfo?.Joining_Date}</p>
          <p> Status : {checkStdfee(UserInfo?.id)}</p>
        </Col>
        <Col sm={4}>
        <p> Father Name : {UserInfo?.S_Fname}</p>
        <p> Mother Name : {UserInfo?.S_Mname}</p>
        <p> Date of Birth : {UserInfo?.Date_of_Birth}</p>
        <p> Address : {UserInfo?.Address}</p>
        <p> Pincode : {UserInfo?.Pincode}</p>
        <p> Contact No : {UserInfo?.P_Contact}</p>
        </Col>
      </Col>
      <Col sm={12} md={9} className='offset-md-3 _flex feePaidstatus-block'>
          <div className='_flex gap-1'>Apr <div className={getfeeStatus('Apr') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>May <div className={getfeeStatus('May') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Jun <div className={getfeeStatus('Jun') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Jul <div className={getfeeStatus('Jul') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Aug <div className={getfeeStatus('Aug') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Sep <div className={getfeeStatus('Sep') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Oct <div className={getfeeStatus('Oct') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Nov <div className={getfeeStatus('Nov') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Dec <div className={getfeeStatus('Dec') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Jan <div className={getfeeStatus('Jan') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Feb <div className={getfeeStatus('Feb') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>
          <div className='_flex gap-1'>Mar <div className={getfeeStatus('Mar') == 'paid' ? 'paid-fee' : 'unpaid-fee'}></div></div>

        </Col>
    </Row> : 
    <Row className='p-0 m-2'>
      <Col className='position-relative' sm={{span:8, offset:2}}>
      <form onSubmit={handleSubmit(handleform)}>
        <input placeholder='Enrollment No'  className='m-1' name='Enroll' {...register('Enroll')} disabled/>
        <input placeholder='Student Name' className='m-1' name="S_Name" {...register('S_Name')}/>
        <input placeholder='Class' className='m-1' name="S_Class" {...register('S_Class')}/>
        <input placeholder='Board' className='m-1' name="Board" {...register('Board')}/>
        <input className='m-1' placeholder='Choose Month' name="month" {...register('month')} onClick={()=> setShowMonth(true)} readOnly/>
        {showmonth ? <div className=' position-absolute top-1 d-flex flex-wrap z-2'>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false); setValue('month','Apr')}}>Apr</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false); setValue('month','May')}}>May</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false); setValue('month','Jun')}}>Jun</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false); setValue('month','Jul')}}>Jul</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false); setValue('month','Aug')}}>Aug</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false);setValue('month','Sep')} }>Sep</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false);setValue('month','Oct')} }>Oct</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false); setValue('month','Nov')}}>Nov</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false); setValue('month','Dec')} }>Dec</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{  setShowMonth(false) ; setValue('month','Jan')}}>Jan</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false); setValue('month','Feb')} }>Feb</span>
          <span className='border border-1 rounded px-3 py-1 mx-1 select-month' onClick={()=>{ setShowMonth(false); setValue('month','Mar')}}>Mar</span>
        </div>:''}
        <input placeholder='Amount' className='m-1' name="AMT" {...register('AMT')}/>
        <button type='submit' className='default-btn'>Submit</button>
        <button  className='default-btn' onClick={()=> setOpenForm(false)}>Cancel</button>
      </form>
    </Col>
    </Row>
    }
      <Snackbarcompo data={snackBar} openSnackBar={openSnackBar}/>
  </Container>
  )
}

export default Feestatus