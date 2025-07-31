import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function ShowEmployeesForEmp() {
  const [employee, setEmployee] = useState([]);
  let navigate = useNavigate();
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [ffirstname, setFFrstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");

let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";


  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`${app}/get_all_emp_data`)
    // axios.get("http://localhost:8080/get_all_emp_data")  
      .then((response) => {
        setEmployee(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching data: " + error);
      });
  };
   
    let findEmployeeByFirstName=()=>{
        axios.get(`${app}/get_emp_data_by_firstname/${ffirstname}`)
        // axios.get(`http://localhost:8080/get_emp_data_by_firstname/${ffirstname}`)  
      .then((response) => {
        setFilteredEmployees(response.data)
      })
      .catch((error) => {
       toast.error(error)
      });
    }
    let findEmployeeByLastName=()=>{
      // axios.get(`http://localhost:8080/get_emp_data_by_lastname/${lastname}`)  
      axios.get(`${app}/get_emp_data_by_lastname/${lastname}`)
      .then((response) => {
        setFilteredEmployees(response.data)
      })
      .catch((error) => {
        toast.error(error)
      });

    }
    let findEmployeeByDepartment=()=>{
        // axios.get(`http://localhost:8080/get_emp_data_by_depa/${department}`) 
        axios.get(`${app}/get_emp_data_by_depa/${department}`) 
      .then((response) => {
        setFilteredEmployees(response.data)
      })
      .catch((error) => {
        toast.error(error)
      });
    }
    let findEmployeeByDesignation=()=>{
        //  axios.get(`http://localhost:8080/get_emp_data_by_designation/${designation}`)
        axios.get(`${app}/get_emp_data_by_designation/${designation}`)  
      .then((response) => {
        setFilteredEmployees(response.data)
      })
      .catch((error) => {
        toast.error(error)
      });
    }
    let leaveApplication=()=>{
      navigate("/leaveApplicaionForm")
    }

  return (
    <div>
   <div className="container py-4">
       <h1 className='btn btn-success bg-black text-info'>Filter Employee Information</h1>
       <div className='text-end' >
             <button className='btn btn-success bg-black text-info ' onClick={leaveApplication}>Leaves</button>
       </div>
             
  <div className="row g-3">
    <div className="col-12 col-md-6 col-lg-3">
      <input type="text" placeholder="Enter First Name " className="form-control bg-black text-danger" onKeyUp={findEmployeeByFirstName}  onChange={(event)=>{setFFrstName(event.target.value)}}/>
     </div>
    <div className="col-12 col-md-6 col-lg-3">
      <input type="text" placeholder="Enter Last Name" className="form-control bg-black text-danger"  onKeyUp={findEmployeeByLastName} onChange={(event)=>{setLastName(event.target.value)}}/>
    </div>
    <div className="col-12 col-md-6 col-lg-3">
      <input type="text" placeholder="Enter Department" className="form-control bg-black text-danger"  onKeyUp={findEmployeeByDepartment} onChange={(event)=>{setDepartment(event.target.value)}}/>
     </div>
    <div className="col-12 col-md-6 col-lg-3">
      <input type="text" placeholder="Enter Designation" className="form-control bg-black text-danger"  onKeyUp={findEmployeeByDesignation} onChange={(event)=>{setDesignation(event.target.value)}}/>
     </div>
  </div>
</div>
    
    <div className='container mt-4 border border-dark rounded w-120' >
      <h2 className='mb-4 text-center text-info '>Employee List</h2>
      <div className='row'>
        {
  (filteredEmployees.length > 0 ? filteredEmployees : employee).map((empData, index) => (
          <div className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4' key={empData.empId}>
            <div className="card h-100 shadow-sm ">              
              <img src={empData.profile} className="card-img-top p-3 " alt="Profile" style={{"borderRadius" :"9rem", height: '15rem',objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title"> 
                  {empData.firstName} {empData.lastName}
                </h5>
                <p className="card-text">
                  <strong>Emp:</strong> {empData.empId}<br />
                  <strong>Designation:</strong> {empData.designation}<br />
                  <strong>Department:</strong> {empData.department}<br />
                  <strong>Contact:</strong> {empData.contactNo}<br />
                  <strong>Email:</strong> {empData.email}<br></br>
                  <strong>Reporting Manager:</strong> {empData.reportingManager}
                </p>
               
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
