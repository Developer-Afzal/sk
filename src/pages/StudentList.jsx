import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Col, Row } from 'react-bootstrap'
import {Insert, Updation, Deletion, Read} from '../features/crudSlice'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '../Images/delete.png'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ViewIcon from '../Images/view.png'
import EditIcon from '../Images/edit.png'
import {useForm} from 'react-hook-form'


const StudentList = () => {
    const form = useForm();
    const {register, handleSubmit, reset, setValue} = form;
    const [Student, setStudent] = useState({
      S_Name:'',
      S_Fname:'',
      S_Mname:'',
      Address:'',
      Pincode:'',
      Coaching_Time:'',
      P_Contact:'',
      DOB:'',
      S_Class:'',
      S_Board:'',
      Fee:'',
    })
    const [isEdit, SetEdit] = useState(false);
    const [UserId, setUserID] = useState('');
    const [ShowForm, setShowForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage_Records, setperPage_Records] = useState(5)
    const [Startpage, setStartPage] = useState(0)
    const [EndPage, setEndPage] = useState(5)
    const userData = useSelector((state)=> state.crud.users)
    const Dispatch = useDispatch();
    const navigate = useNavigate()
    const ElementRef = useRef(null)
    // console.log(Math.ceil(userData.length/5));



    const Added = (values)=>{
      if(isEdit){
        let std_Data = values;
        std_Data['id'] = UserId;
        Dispatch(Updation(std_Data))
      }else{
        Dispatch(Insert(values))
      }
        setShowForm(false)
        setStartPage(0);
        setEndPage(5)
        setCurrentPage(1) 
        reset() 
        navigate('/studentlist')
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

    const UpdateValue = ()=>{
      let Student_Data = Student
      Student_Data['id'] = UserId
      Dispatch(Updation(Student_Data))
      SetEdit(false)
      setUserID('')
      setShowForm(false)
    }

    const Deletionvalue = (User) =>{
      Dispatch(Deletion(User))
      if(userData.slice(Startpage,EndPage).length === 1) {
        handlePageChange('', currentPage-1 )
      }
    }

    const ViewUser = (itm)=>{
      Dispatch(Read(itm))
      navigate('/view')
    }


  const handleForm =(data)=>{
    Added(data)
  }

    // const handleForm = (e)=>{
    //   setStudent({
    //     ...Student,
    //     [e.target.name]:e.target.value
    //   })
    // }

    // const resetForm = ()=>{
    //   Object.keys(Student).forEach(element => {
    //     Student[element] = '' 
    //   });
    // }

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

// const GoAsynchPage = ()=>{
//   navigate('/reduxAsyncthunk')
// }

  return (
    <Container fluid className='m-0 p-0'>
          <Stack className='_flex pt-2 px-2' direction='row' justifyContent="space-between" >
          <h4 className='heading'>{ShowForm ? 'ADD NEW STUDENT' : 'Student List'}</h4>
          <button className='default-btn  px-2 me-2' onClick={()=> {setShowForm(!ShowForm); SetEdit(false); reset() }}>{!ShowForm ? 'ADD Student' : 'Back'}</button>
          </Stack>
          {!ShowForm ? <>
            <Container fluid className='table-block p-0'>
            <table>
            <thead>
                <tr>
                  <th>Student</th>
                  <th>DOB</th>
                  <th className='text-center'>Class</th>
                  <th className='text-center'>Board</th>
                  <th>Address</th>
                  <th className='text-center'>Fee</th>
                  <th className='text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
            {userData.slice(Startpage,EndPage).map((itm)=>
                <tr key={itm.id}>
                  <td>{itm.S_Name}</td>
                  <td>{itm.Date_of_Birth}</td>
                  <td className='text-center'>{itm.S_Class}</td>
                  <td className='text-center'>{itm.S_Board}</td>
                  <td>{itm.Address}</td>
                  <td className='text-center'>{itm.Fee}</td>
                  <td className='text-center'>
                     <img className='icons' src={EditIcon} onClick={()=> EditForm(itm) } alt="edit"/>
                      <img className='icons' src={ViewIcon} onClick={()=>ViewUser(itm)} alt="View"/> 
                      <img className='icons' src={DeleteIcon} onClick={()=> Deletionvalue(itm?.id)} alt="delete"/>
                  </td>  
                </tr>
                )}
            </tbody>
          </table> 
            </Container>
            { /* <button className='default-btn' onClick={GoAsynchPage}>Go To AsyncThunk Example</button> */}
            <Stack spacing={2} className='mt-2 pe-3' direction='row' justifyContent="flex-end">
              <Pagination page={currentPage} siblingCount={2} count={Math.ceil(userData.length/5)} onChange={handlePageChange} ref={ElementRef} className='pagination'/>
              </Stack> 
             </>
             : <>  
          <form>
           <Container>
           <Row className='text-start'>
              <Col sm={4} className="p-1"><label>Student Name</label><input placeholder='Enter Student Name' name="S_Name" {...register('S_Name')} /></Col>
              <Col sm={4} className="p-1"><label>Student's Father Name</label><input placeholder="Enter Student's Father Name"  {...register('S_Fname')} name="S_Fname"/></Col>
              <Col sm={4} className="p-1"><label>Student's Mother Name</label><input placeholder="Enter Student's mother Name "  {...register('S_Mname')} name="S_Mname"/></Col>
              <Col sm={4} className="p-1"><label>Address</label><input placeholder='Enter Student Address'  {...register('Address')} name="Address"/></Col>
              <Col sm={4} className="p-1"><label>Pincode</label><input placeholder='Enter Pincode' {...register('Pincode')}  name="Pincode"/></Col>
              <Col sm={4} className="p-1"><label>Coaching Time</label><input placeholder='Coaching Time'  {...register('Coaching_Time')}  name="Coaching_Time"/></Col>
              <Col sm={4} className="p-1"><label>Parent's Contact Number</label><input placeholder="Parent's Contact Number" {...register('P_Contact')}  name="P_Contact"/></Col>
              <Col sm={4} className="p-1"><label>Date of Birth</label><input type='date' placeholder="Date of Birth"  {...register('Date_of_Birth')} name="Date_of_Birth"/></Col>
              <Col sm={4} className="p-1"><label>Student Class</label><input placeholder="Enter Student Class"  {...register('S_Class')} name="S_Class"/></Col>
              <Col sm={4} className="p-1"><label>Medium</label><select  {...register('S_Board')} name="S_Board"><option  value="">Select Board</option><option value="UP BOARD">UP BOARD</option><option value="ICSE">ICSE</option><option value="CBSE">CBSE</option></select></Col>
              <Col sm={4} className="p-1"><label>Coaching Fees</label><input placeholder='Fees'  {...register('Fee')} name="Fee"/></Col>
              {/* <Col sm={4} className="p-1"><label>Subjects</label><select><option selected>Select Sujects </option><option>Hindi</option><option>English</option><option>Math</option><option>Physics</option><option>Chemistry</option><option>Biology</option><option>Science</option><option>Commerce</option><option>Arts Stream</option></select></Col> */}
              <Col sm={12} className='p-0'><button type='submit' onClick={handleSubmit(handleForm) } className='default-btn'>ADD</button>
              <button className='default-btn' type='reset' onClick={()=> { navigate('/studentlist'); setShowForm(false); reset()  } }>Cancel</button></Col>
            </Row>
           </Container>
          </form>
          </>}
    </Container>
  )
}

export default StudentList