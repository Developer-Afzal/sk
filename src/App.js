
import './App.css';
import StudentList from './pages/StudentList';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ViewUser from './Components/ViewUser';
import AsyncThunkEx from './Components/AsyncThunkEx';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import Exam from './pages/Exam';
import Feestatus from './pages/Feestatus';
import ImportantDate from './pages/ImportantDate'
import Login from './pages/Login';
function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/studentlist" element={<StudentList/>}/>
          <Route path="/view" element={<ViewUser/>}/>
          <Route path="/exam" element={<Exam/>}/>
          <Route path="/importantDate" element={<ImportantDate/>}/>
          <Route path="/feestatus" element={<Feestatus/>}/>
          <Route path="/reduxAsyncthunk" element={<AsyncThunkEx/>}/>
          </Route>      
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
