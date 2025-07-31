import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function UpdateEmployee() {
   const  info  = useParams();
   let empId=info.empid;
            let navigate=useNavigate();
            const [loading, setLoading] = useState(false); 
            let[firstName,setFirstName]=useState('');
            let[lastName,setLastName]=useState('');
            let[department,setDepartment]=useState('');
            let[salary,setSalary]=useState(0);
            let[email,setEmail]=useState('');
            let[contactNo,setContactNo]=useState(0);
            let[joiningDate,setjoiningDate]=useState();  
            let[dob,setDob]=useState();  
            let[designation,setDesignation]=useState("");  
            let[exp,setExp]=useState(0);
            let[address,setAddress]=useState('');   
            let[gender,SetGender]=useState("");   
            let[status,setStatus]=useState('');  
            let[reportingManager,setReportingManager]=useState(''); 
            let[profile,setProfile]=useState(); 
let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";
  

   useEffect(()=>{
      axios.get(`${app}/get_emp_data_by_empid/${empId}`)
      // axios.get(`http://localhost:8080/get_emp_data_by_empid/${empId}`)
      .then((response)=>{
             if(response.data){
              let empdata=response.data;
               setFirstName(empdata.firstName);
               setLastName(empdata.lastName);
               setDepartment(empdata.department);
               setAddress(empdata.address);
               setContactNo(empdata.contactNo);
               setDesignation(empdata.designation);
               setEmail(empdata.email);
               setExp(empdata.exp);
               setDob(empdata.dob);
               SetGender(empdata.gender);
               setjoiningDate(empdata.joiningDate);
               setSalary(empdata.salary);
               setReportingManager(empdata.reportingManager);
               setProfile(empdata.profile);
               setStatus(empdata.status);

             }
      })
      .catch((error)=>{
        toast.error(error);
      })
     },[]);
    
   let handlsave=(event)=>{
      event.preventDefault();
       
     let newemp={firstName,lastName,department,salary,email,contactNo,joiningDate,dob,designation,exp,address,gender,status,profile,reportingManager};
      setLoading(true)
      
     axios.put(`${app}/update_emp_data/${empId}`,newemp)
      // axios.put(`http://localhost:8080/update_emp_data/${empId}`,newemp)
     .then((response)=>{
      toast.success(response.data);
      navigate('/showAllEmployeeList');
              
     })
     .catch((error)=>{
      toast.error(error);
     })
   }

      let handleImg = (event) => {
        var file = event.target.files[0];
        var filepath = `./img/${file.name}`;
         setProfile(filepath);
      }

      let backToAdminPage=()=>{
        navigate('/showAllEmployeeList')
      }


  return (
    <div>
       <form onSubmit={handlsave} className="container mt-4 p-4 border">
  <h2 className="mb-4 text-center text-primary">Update Here  Here...!</h2>

  <div className="row mb-3">
    <div className="col-md-6">
      <label className="form-label bg-black text-info">First Name</label>
      <input type="text" className="form-control bg-black text-info" placeholder="Enter first name" value={firstName}  onChange={(event)=>{setFirstName(event.target.value)}}/>
    </div>
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Last Name</label>
      <input type="text" className="form-control bg-black text-info" placeholder="Enter last name" value={lastName} onChange={(event)=>{setLastName(event.target.value)}} />
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Department</label>
      <input type="text" className="form-control bg-black text-info" placeholder="Enter department" value={department} onChange={(event)=>{setDepartment(event.target.value)}}/>
    </div>
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Salary</label>
      <input type="number" className="form-control bg-black text-info" placeholder="Enter salary" value={salary} onChange={(event)=>{setSalary(event.target.value)}}/>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Email</label>
      <input type="email" className="form-control bg-black text-info" placeholder="Enter email" value={email}  onChange={(event)=>{setEmail(event.target.value)}}/>
    </div>
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Contact</label>
      <input type="number" className="form-control bg-black text-info" placeholder="Enter contact number"  value={contactNo} onChange={(event)=>{setContactNo(event.target.value)}}/>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Joining Date</label>
      <input type="date" className="form-control bg-black text-info" value={joiningDate} onChange={(event)=>{setjoiningDate(event.target.value)}} />
    </div>
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Date Of Birth</label>
      <input type="date" className="form-control bg-black text-info" value={dob} onChange={(event)=>{setDob(event.target.value)}}/>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Designation</label>
      <input type="text" className="form-control bg-black text-info" placeholder="Enter designation" value={designation} onChange={(event)=>{setDesignation(event.target.value)}}/>
    </div>
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Experience (Years)</label>
      <input type="number" className="form-control bg-black text-info" placeholder="Enter experience" value={exp}  onChange={(event)=>{setExp(event.target.value)}}/>
    </div>
  </div>

  <div className="mb-3">
    <label className="form-label bg-black text-info">Address</label>
    <input type="text" className="form-control bg-black text-info" placeholder="Enter address" value={address} onChange={(event)=>{setAddress(event.target.value)}}/>
  </div>

  <div className="mb-3">
    <label className="form-label d-block bg-black text-info">Gender</label>
    <div className="form-check form-check-inline">
      <input className="form-check-input bg-black text-info" type="radio" name="gender" id="male" value="male" checked={gender==="male"}  onChange={(event)=>{SetGender(event.target.value)}}/>
      <label className="form-check-label bg-black text-info">Male</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="form-check-input bg-black text-info" type="radio" name="gender" id="female" value="female"  checked={gender==="female"}   onChange={(event)=>{SetGender(event.target.value)}} />
      <label className="form-check-label bg-black text-info">Female</label>
    </div>
  </div>

  <div className="row mb-3">
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Status</label>
      <select className="form-select bg-black text-info" value={status} onChange={(event)=>{setStatus(event.target.value)}}>
        <option selected disabled>Select status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    </div>
    <div className="col-md-6">
      <label className="form-label bg-black text-info">Profile Photo</label>
      <input type="file" className="form-control bg-black text-info" accept="image/*" onChange={handleImg}/>
    </div>
  </div>

  <div className="mb-3">
    <label className="form-label bg-black text-info">Reporting Manager</label>
    <input type="text" className="form-control bg-black text-info" placeholder="Enter manager name" value={reportingManager} onChange={(event)=>{setReportingManager(event.target.value)}} />
  </div>

  <div className="text-center">
    <button type="submit" className="btn border border-dark-1 text-info px-4" disabled={loading}>{loading?"Wait...":"Update"}</button>
  </div>
  <div className="text-end">
    <button type="submit" className="btn border border-dark-1 text-info px-4" disabled={loading}>{loading?"Wait...":"Back"}</button>
  </div>
</form>

    </div>
  )
}