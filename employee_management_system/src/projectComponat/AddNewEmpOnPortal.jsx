import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function AddNewEmpOnPortal() {
  const [employee, setEmployee] = useState([]);
  let navigate = useNavigate();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [ffirstname, setFFrstName] = useState("");
  const [loading, setLoading] = useState(false); 
let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";



  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`${app}/get_reg_data`)
    // axios.get("http://localhost:8080/get_reg_data")  
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching data: " + error);
      });
  };

    let findEmployeeByFirstName=()=>{
        // axios.get(`http://localhost:8080/get_emp_data_by_firstname/${ffirstname}`)  
        axios.get(`${app}/get_emp_data_by_firstname/${ffirstname}`)  
      .then((response) => {
       getData()       
       
      })
      .catch((error) => {
        toast.error(error)
      });
    }
    
   let addNewEmpOnOfficalCampnyPortal=(userId)=>{
   navigate(`/registerUserToEmp/${userId}`)
   }
   let backToShowEpmPage=()=>{
    navigate('/showAllEmployeeList')
   }

  return (
    <div>
   <div className="container py-4">
       
  <div className="row g-3">
    <div className="col-12 col-md-6 col-lg-3">
      <input type="text" placeholder="Enter First Name " className="form-control bg-black text-danger" onKeyUp={findEmployeeByFirstName}  onChange={(event)=>{setFFrstName(event.target.value)}}/>
     </div>
    
  </div>
</div>
    
    <div className='container mt-4 border border-dark rounded w-120' >
      <h2 className='mb-4 text-center text-info '>This are not add the portal</h2>
      <div className='row'>
        {
  (filteredEmployees.length > 0 ? filteredEmployees : employee).map((empData, index) => (
          <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={empData.empId}>
            <div className="card h-100 shadow-sm ">
              
              <img src={empData.profile} className="card-img-top p-3 " alt="Profile" style={{"borderRadius" :"9rem", height: '15rem',objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">
                  {empData.firstName} {empData.lastName}
                </h5>
                <p className="card-text">
                   <strong>Emp:</strong> {empData.userId}<br />
                  <strong>Exp:</strong> {empData.exp}<br />
                  <strong>Department:</strong> {empData.department}<br />
                  <strong>Contact:</strong> {empData.contactNo}<br />
                  <strong>Email:</strong> {empData.email}<br></br>
                  
                </p>
                <div className='d-flex justify-content-evenly'>
                  <button className='btn btn-success' onClick={()=>addNewEmpOnOfficalCampnyPortal(empData.userId)} disabled={loading}>{loading ? "Wait..." : "Add"}</button>
                  
                </div>
              </div>
            </div>
            
          </div>
          
        ))}
      </div>
      <button className='btn btn-success text-end' onClick={backToShowEpmPage}>Back</button>
    </div>
    
    </div>
  );
}
