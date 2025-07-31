import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import HomePage from './projectComponat/HomePage';
import ShowEmployees from './projectComponat/ShowEmployees';
import { Route,Routes } from 'react-router-dom';
import AddEmployeeForm from './projectComponat/AddEmployeeForm';
import UpdateEmployee from './projectComponat/UpdateEmployee';
import AdminNavbar from './projectComponat/AdminNavbar';
import ShowEmployeesForEmp from './projectComponat/ShowEmployeesForEmp';
import NewUserRegister from './projectComponat/NewUserRegister';
import ServicesPage from './projectComponat/ServicesPage';
import { ToastContainer } from 'react-toastify';
import AddNewEmpOnPortal from './projectComponat/AddNewEmpOnPortal';
import RegisterUserOnEmp from './projectComponat/RegisterUserOnEmp';
import LeaveApplicationForm from './projectComponat/LeaveApplicationForm';
import Leaves from './projectComponat/Leaves';



function App() {

  return (
    <div className="app-container">
      <AdminNavbar></AdminNavbar>
      
      <video id="bgvideo" autoPlay muted loop playsInline>
        <source src="bg.mp4" type="video/mp4" />        
      </video>

      
     <div>
      
        <Routes>
          <Route path='/' element={<HomePage/>}> </Route>
          <Route path='/home' element={<HomePage/>}></Route>
          <Route path="/addemployee" element={<AddEmployeeForm/>}></Route> 
          <Route path='/showAllEmployeeList' element={<ShowEmployees/>}></Route>
          <Route path='/showAllEmployeeListForEmp' element={<ShowEmployeesForEmp/>}></Route>
          <Route path='/newUserRegistration' element={<NewUserRegister/>}></Route>
          <Route path='/servicesPage' element={<ServicesPage/>}></Route>
          <Route path='/upateemployee/:empid' element={<UpdateEmployee/>}></Route>
          <Route path='/addNewEmpOnPortal' element={<AddNewEmpOnPortal/>}></Route>
          <Route path="/registerUserToEmp/:userId" element={<RegisterUserOnEmp/>}></Route>
          <Route path="/leaveApplicaionForm" element={<LeaveApplicationForm/>}> </Route>
          <Route path='/leavesApplicationForm' element={<Leaves/>}></Route>
        
        </Routes>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
}

export default App;
