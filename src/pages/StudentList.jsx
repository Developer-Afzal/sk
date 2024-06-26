import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Col, Row} from 'react-bootstrap'
import {Insert, Updation, Deletion, Read} from '../features/crudSlice'
import {RemovefeeStatus} from '../features/StdfeeSlice'
import { useNavigate, useOutletContext } from 'react-router-dom'
import DeleteIcon from '../Images/delete.png'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ViewIcon from '../Images/view.png'
import EditIcon from '../Images/edit.png'
import moreIcon from '../Images/moreIcon.png'
import {useForm} from 'react-hook-form'
import Modal from '../Components/Modal'
import Snackbarcompo from '../Components/Snackbarcompo';


const StudentList = () => {
    const form = useForm();
    const {register, handleSubmit, reset, setValue, formState:{errors}} = form;
    const [isEdit, SetEdit] = useState(false);
    const [UserId, setUserID] = useState('');
    const [ShowForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage_Records, setperPage_Records] = useState(5)
    const [Startpage, setStartPage] = useState(0)
    const [EndPage, setEndPage] = useState(5)
    const [popOver, setpopOver] = useState(false);
    const [openModal, setopenModal] = useState(false)
    const [searchData, setsearchData] = useState(null)
    const [skeleton, setskeleton] = useState(false)
    const [dataNotFound, setdataNotFound] = useState(false)
    const userData = useSelector((state)=> state.crud.users);
    const Dispatch = useDispatch();
    const navigate = useNavigate()
    const [snackBar, setsnackBar] = React.useState({Click:false, message:'', msgType:''});
    // console.log(Math.ceil(userData.length/5));
    const context = useOutletContext();
  
    const Data = [
      {id:"179380954", S_Name:"Abhishek", S_Fname:"Rakesh", S_Mname:"neelam", Address:"Sector E", Date_of_Birth:"2024-03-27",Pincode:"342342",Coaching_Time:"6:00 To 7:00", P_Contact:"8746237647",S_Class:"X", S_Board:"ICSE", Fee:"5500", joining_date:"2024-04-10", Status:"UnPaid"},
      {id:"179380955", S_Name:"Vijay", S_Fname:"Rakesh", S_Mname:"Sarla", Address:"Sector E", Date_of_Birth:"2024-03-27",Pincode:"342342",Coaching_Time:"6:00 To 7:00", P_Contact:"8746237647",S_Class:"X", S_Board:"ICSE", Fee:"5500", joining_date:"2024-04-10", Status:"UnPaid"},
      {id:"179380956", S_Name:"Anil", S_Fname:"Rakesh", S_Mname:"Anita Singh", Address:"Sector E", Date_of_Birth:"2024-03-27",Pincode:"342342",Coaching_Time:"6:00 To 7:00", P_Contact:"8746237647",S_Class:"X", S_Board:"ICSE", Fee:"5500", joining_date:"2024-04-10", Status:"UnPaid"}
    ]
  

    useEffect(()=>{
      if(userData.length === 0){
        for(let i of Data)
        Dispatch(Insert(i))
      }
    
    },[])
   
    useEffect(()=>{
      setskeleton(true)
      let Cleartimeout;
      setsearchData(userData.filter((itm)=> itm.id === context)) 
      Cleartimeout = setTimeout(()=>{
        setskeleton(false)
      }, 2000)
      return()=>{
        clearTimeout(Cleartimeout)
      }
      },[context])
    
    const Added = (values)=>{
      let std_Data = values;
      if(isEdit){
        std_Data['id'] = UserId;
        std_Data['Status'] = 'UnPaid'
        Dispatch(Updation(std_Data))
        openSnackBar({click:true,message:'Edited Successfully', mgss:'success' })
      }else{
        std_Data['id'] = generateRandomNineDigitNumber();
        std_Data['Status'] = 'UnPaid'
        Dispatch(Insert(values))
        openSnackBar({click:true,message:'Added Successfully', mgss:'success' })
      }
        setShowForm(false)
        setStartPage(0);
        setEndPage(5)
        setCurrentPage(1) 
        reset() 
    } 
    const EditForm = (user)=>{
      setUserID(user.id)
      setValue('S_Name', user?.S_Name);
      setValue('S_Fname', user?.S_Fname);
      setValue('S_Mname', user?.S_Mname);
      setValue('Address', user?.Address);
      setValue('Date_of_Birth', user?.Date_of_Birth);
      setValue('Pincode', user?.Pincode);
      setValue('Coaching_Time', user?.Coaching_Time);
      setValue('P_Contact', user?.P_Contact);
      setValue('S_Class', user?.S_Class);
      setValue('S_Board', user?.S_Board);
      setValue('Fee', user?.Fee);
      SetEdit(true); 
      setShowForm(true);
    }

    const Deletionvalue = (User) =>{
      setopenModal(true)
      setUserID(User)
    }

    const Hidemodal = (value)=>{
      setopenModal(value?.close)
      if(value?.Click){
        Dispatch(Deletion(UserId));
        Dispatch(RemovefeeStatus(UserId))
      if(userData.slice(Startpage,EndPage).length === 1) {
          handlePageChange('', currentPage-1 )
        }
        openSnackBar({click:true,message:'Deleted Successfully', mgss:'success' })
      }
    }


    const ViewUser = (itm)=>{
      Dispatch(Read(itm))
      navigate(`${itm}`)
    }


  const handleForm =(data)=>{
    Added(data)
  }


  function generateRandomNineDigitNumber() {
    let result = '';
    for (let i = 0; i < 9; i++) {
      result += Math.floor(Math.random() * 10); // Generate a random digit (0-9)
    }
    return result;
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


  const openSnackBar = (e)=>{
    setsnackBar((prevState)=>({
      ...prevState,
      Click:e.click,
      message:e.message,
      msgType:e.mgss
    }))
   }

  const handlechanges =(e)=>{

    if (!/^\d$/.test (e.key) && e.key !== 'Backspace'){
      e.preventDefault();
    }
  }

  const Expandmenu = (e, value)=>{
    e.stopPropagation();
    setUserID(value)
    setpopOver(true); 
  }

// const GoAsynchPage = ()=>{
//   navigate('/reduxAsyncthunk')
// }

  return (
    <Container fluid className='m-0 p-0' onClick={()=> setpopOver(false)}>
          <Stack className='_flex pt-2 px-2' direction='row' justifyContent="space-between" >
          <h4 className='heading'>{ShowForm ? 'ADD NEW STUDENT' : 'Student List'}</h4>
          <button className='default-btn  px-2 me-2' onClick={()=> {setShowForm(!ShowForm); SetEdit(false); reset() }}>{!ShowForm ? 'ADD Student' : 'Back'}</button>
          </Stack>
          {!ShowForm ? <>
            <Container fluid className='table-block p-0'>
            <table>
            <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student</th>
                  <th className='text-center'>DOB</th>
                  <th className='text-center'>Class</th>
                  <th className='text-center'>Board</th>
                  <th className='text-center'>Fee</th>
                  <th className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
            {!skeleton ? (context ? searchData : userData)?.slice(Startpage,EndPage).map((itm)=>
                <tr key={itm.id} >
                  <td>{itm.id}</td>
                  <td>{itm.S_Name}</td>
                  <td className='text-center'>{itm.Date_of_Birth}</td>
                  <td className='text-center'>{itm.S_Class}</td>
                  <td className='text-center'>{itm.S_Board}</td>
                  <td className='text-center'>{itm.Fee}</td>
                  <td className='text-center'>
                  <div className='popover d-sm-none _flex'>
                    <div className={popOver && UserId === itm.id ? 'popoverOpen' : 'icons-block'}>
                    <img className='icons' src={EditIcon} onClick={()=> EditForm(itm) } alt="edit"/>
                    <img className='icons' src={ViewIcon} onClick={()=>ViewUser(itm?.id)} alt="View"/>
                    <img className='icons' src={DeleteIcon} onClick={()=> Deletionvalue(itm?.id)} alt="delete"/>
                    </div>
                    <span className={popOver && UserId === itm.id ? 'd-none' :  "info" }>
                      <img className='icons' src={moreIcon} onClick={(e)=> Expandmenu(e,itm.id)} alt="Action"/>
                    </span>
                  </div>
                      <img className='icons d-none d-sm-inline' src={EditIcon} onClick={()=> EditForm(itm) } alt="edit"/>
                      <img className='icons d-none d-sm-inline' src={ViewIcon} onClick={()=>ViewUser(itm?.id)} alt="View"/> 
                      <img className='icons d-none d-sm-inline' src={DeleteIcon} onClick={()=> Deletionvalue(itm?.id)} alt="delete"/>
                  </td>  
                </tr>
                ):''}
            </tbody>
           {skeleton ? 
             <tbody>
             <tr className='skeleton'><td colSpan={7}></td></tr>
             <tr className='skeleton'><td colSpan={7}></td></tr>
             <tr className='skeleton'><td colSpan={7}></td></tr>
             <tr className='skeleton'><td colSpan={7}></td></tr>
             <tr className='skeleton'><td colSpan={7}></td></tr>
             </tbody> :!skeleton && context && searchData?.length === 0 ?  <tbody>
             <tr><td colSpan={7} className='text-center'> Data Not Found !</td></tr>
             </tbody>:''
          }
          </table> 
          <Modal data={openModal} HideModal={Hidemodal}/>
            </Container>
            { /* <button className='default-btn' onClick={GoAsynchPage}>Go To AsyncThunk Example</button> */}
            {context ? '' : <Stack spacing={2} className='mt-2 pe-3' direction='row' justifyContent="flex-end">
              <Pagination page={currentPage} siblingCount={2} count={Math.ceil(userData.length/5)} onChange={handlePageChange} className='pagination'/>
              </Stack> }
           </>
          :  <form>
           <Container className='py-2'>
           <Row className='text-start'>
              <Col sm={4} className="p-1"><label>Student Name</label><input placeholder='Enter Student Name' name="S_Name" {...register('S_Name' ,{required:{value:true, message:'Please enter Name'}} ) }  autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.S_Name?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Student's Father Name</label><input placeholder="Enter Student's Father Name"  {...register('S_Fname' ,{required:{value:true, message:"Please enter Father's Name"}} )} name="S_Fname" autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.S_Fname?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Student's Mother Name</label><input placeholder="Enter Student's mother Name "  {...register('S_Mname' ,{required:{value:true, message:"Please enter Mother's Name"}} )} name="S_Mname" autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.S_Mname?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Address</label><input placeholder='Enter Student Address'  {...register('Address',{required:{value:true, message:'Please enter Address'}} )} name="Address" autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.Address?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Pincode</label><input placeholder='Enter Pincode' maxLength={6} {...register('Pincode',{required:{value:true, message:'Please enter Pincode'}} )}  name="Pincode" onKeyDown={handlechanges} autoComplete='off'/><p className='p-0 m-0 errorStyle'>{errors.Pincode?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Coaching Time</label><input placeholder='Coaching Time'  {...register('Coaching_Time',{required:{value:true, message:'Please enter Coaching Time'}} )}  name="Coaching_Time"/><p className='p-0 m-0 errorStyle'>{errors.Coaching_Time?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Parent's Contact Number</label><input placeholder="Parent's Contact Number" maxLength={10} {...register('P_Contact',{required:{value:true, message:'Please enter Contact'}} )}  name="P_Contact" onKeyDown={handlechanges} autoCapitalize='off'/><p className='p-0 m-0 errorStyle'>{errors.P_Contact?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Date of Birth</label><input type='text'  placeholder="dd/mm/yyyy"  onFocus={(e)=> { e.currentTarget.type = "date"; e.currentTarget.focus();}}  {...register('Date_of_Birth',{required:{value:true, message:'Please enter DOB'}} )} name="Date_of_Birth"/><p className='p-0 m-0 errorStyle'>{errors.Date_of_Birth?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Student Class</label><select {...register('S_Class',{required:{value:true, message:'Please enter Student Class'}} )} name="S_Class"><option value="">Select Class</option>Select Class<option value="IX">IX</option><option value="X">X</option><option value="XI">XI</option><option value="XII">XII</option></select><p className='p-0 m-0 errorStyle'>{errors.S_Class?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Medium</label><select  {...register('S_Board',{required:{value:true, message:'Please enter Board'}} )} name="S_Board"><option  value="">Select Board</option><option value="UP BOARD">UP BOARD</option><option value="ICSE">ICSE</option><option value="CBSE">CBSE</option></select><p className='p-0 m-0 errorStyle'>{errors.S_Board?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Coaching Fees</label><input placeholder='Fees'  {...register('Fee',{required:{value:true, message:'Please enter Fees Amt'}} )} name="Fee" onKeyDown={handlechanges} autoCapitalize='off'/><p className='p-0 m-0 errorStyle'>{errors.Fee?.message}</p></Col>
              <Col sm={4} className="p-1"><label>Date of Joining</label><input type='text'  placeholder="dd/mm/yyyy"  onFocus={(e)=> { e.currentTarget.type = "date"; e.currentTarget.focus();}}  {...register('joining_date',{required:{value:true, message:'Please enter DOB'}} )} name="joining_date"/><p className='p-0 m-0 errorStyle'>{errors.joining_date?.message}</p></Col>
              {/* <Col sm={4} className="p-1"><label>Subjects</label><select><option selected>Select Sujects </option><option>Hindi</option><option>English</option><option>Math</option><option>Physics</option><option>Chemistry</option><option>Biology</option><option>Science</option><option>Commerce</option><option>Arts Stream</option></select></Col> */}
              <Col sm={12} className='px-1 py-0'><button type='submit' onClick={handleSubmit(handleForm) } className='default-btn'>ADD</button>
              <button className='default-btn' type='reset' onClick={()=> {  setShowForm(false); reset()  } }>Cancel</button></Col>
            </Row>
           </Container>
            </form>
          }
          <Snackbarcompo data={snackBar} openSnackBar={openSnackBar}/>
    </Container>
  )
}

export default StudentList