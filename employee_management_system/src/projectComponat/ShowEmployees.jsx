import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function ShowEmployees() {
  const [employee, setEmployee] = useState([]);
  let navigate = useNavigate();
   const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [ffirstname, setFFrstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false); 
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

      //  axios.get("http://localhost:8080/send_bady_gmail")  
       axios.get(`${app}/send_bady_gmail`)
      .then((response) => {
        toast.success(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching data: " + error);
      });
  };

  let deleteEmp = (empId) => {
    setLoading(true)
  axios.delete(`${app}/delete_by_emp_id?empId=${empId}`)  
  // axios.delete(`http://localhost:8080/delete_by_emp_id?empId=${empId}`)  
    .then((response) => {
      toast.success(response.data);
      getData(); 
    })
    .catch((error) => {
      toast.error( error);
    })
    .finally(setLoading(false))
    };

    let updateRecord=(empid)=>{
     navigate(`/upateemployee/${empid}`);

    }
    let findEmployeeByFirstName=()=>{
        axios.get(`${app}/get_emp_data_by_firstname/${ffirstname}`) 
        // axios.get(`http://localhost:8080/get_emp_data_by_firstname/${ffirstname}`)  
      .then((response) => {
        setFilteredEmployees(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
    }
    let findEmployeeByLastName=()=>{
      // axios.get(`http://localhost:8080/get_emp_data_by_lastname/${lastname}`)  
      axios.get(`${app}/get_emp_data_by_lastname/${lastname}`)
      .then((response) => {
        setFilteredEmployees(response.data)
      })
      .catch((error) => {
        console.log(error)
      });

    }
    let findEmployeeByDepartment=()=>{
        // axios.get(`http://localhost:8080/get_emp_data_by_depa/${department}`) 
        axios.get(`${app}/get_emp_data_by_depa/${department}`) 
      .then((response) => {
        setFilteredEmployees(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
    }
    let findEmployeeByDesignation=()=>{
        //  axios.get(`http://localhost:8080/get_emp_data_by_designation/${designation}`) 
        axios.get(`${app}/get_emp_data_by_designation/${designation}`) 
      .then((response) => {
        setFilteredEmployees(response.data)
      })
      .catch((error) => {
        console.log(error)
      });
    }


   let addNewEmpOnOfficalCampnyPortal=()=>{

      navigate('/addNewEmpOnPortal')

   }
   let leavesApplication=()=>{
    navigate('/leavesApplicationForm')
   }

  return (
    <div>
   <div className="container py-4">
    <div>
       <h1 className='btn btn-success bg-black text-info'>Filter Employee Information</h1><br />
       <button className='btn btn-success bg-black text-info' onClick={()=>addNewEmpOnOfficalCampnyPortal()}> Wating To Add The Comapny Portal</button>
       <button className='btn btn-success bg-black text-info' onClick={()=>leavesApplication()}>Leaves Application</button>
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
                   <strong>reportingManager:</strong> {empData.reportingManager}
                </p>
                <div className='d-flex justify-content-evenly'>
                  <button className='btn btn-success' onClick={()=>updateRecord(empData.empId)} disabled={loading}>{loading?"wait..":"Update"}</button>
                  <button className='btn btn-danger'onClick={() => deleteEmp(empData.empId)} disabled={loading}>{loading?"Wait..":"Delete"}</button>
                </div>
                
              </div>
             
            </div>
           
          </div>
          
        ))}
         
      </div>
     
    </div>
   
    </div>
    
  );
  
}
