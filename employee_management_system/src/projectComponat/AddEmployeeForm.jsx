import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

export default function AddEmployeeForm() {
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [department, setDepartment] = useState('');
  let [salary, setSalary] = useState('');
  let [email, setEmail] = useState('');
  let [contactNo, setContactNo] = useState('');
  let [joiningDate, setJoiningDate] = useState('');
  let [dob, setDob] = useState('');
  let [designation, setDesignation] = useState('');
  let [exp, setExp] = useState('');
  let [address, setAddress] = useState('');
  let [gender, SetGender] = useState('');
  let [status, setStatus] = useState('');
  let [reportingManager, setReportingManager] = useState('');
  const [loading, setLoading] = useState(false); 

    let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";
    

  // let [profile, setProfile] = useState('');

  const validateForm = () => {
    const salaryVal = parseFloat(salary);
    const emailPattern =  /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const contactPattern = /^[0-9]{10}$/;

    if (!firstName || !lastName || !department || !salary || !email || !contactNo || !joiningDate || !dob) {
      toast.error("All fields marked as required must be filled.");
      return false;
    }

    if (isNaN(salaryVal) || salaryVal < 0) {
      toast.error("Salary must be a valid number.");
      return false;
    }

    if (!emailPattern.test(email)) {
      toast.error("Email must be a valid Gmail address (e.g., example@gmail.com).");
      return false;
    }

    if (!contactPattern.test(contactNo)) {
      toast.error("Contact number must be a 10-digit number.");
      return false;
    }

    return true;
  };

  let addUser = (event) => {
    event.preventDefault();

    if (!validateForm()) return;
    setLoading(true);

    let employee = {
      firstName,
      lastName,
      department,
      salary: parseFloat(salary),
      email,
      contactNo,
      joiningDate,
      dob,
      designation,
      exp: parseInt(exp),
      address,
      gender,
      status,
      reportingManager,
      // profile
    };

    axios.post(`${app}/add_new_emp_data`, employee)
    // axios.post("http://localhost:8080/add_new_emp_data", employee)
      .then((response) => {
        toast.success(response.data);
      })
      .catch((error) => {
        toast.error(error);
      })
       .finally(() => setLoading(false));
  };

 

  return (
    <div>
      <form onSubmit={addUser} className="container mt-4 p-4 border rounded shadow">
        <h2 className="mb-4 text-center text-primary">Register Here...!</h2>

       
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">First Name</label>
            <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setFirstName(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Last Name</label>
            <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Department</label>
            <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setDepartment(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Salary</label>
            <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setSalary(e.target.value)} />
          </div>
        </div>

        {/* Email & Contact */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Email</label>
            <input type="email" className="form-control bg-transparent text-info" required onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Contact</label>
            <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setContactNo(e.target.value)} />
          </div>
        </div>

        {/* Joining Date & DOB */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Joining Date</label>
            <input type="date" className="form-control bg-transparent text-info" required onChange={(e) => setJoiningDate(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Date Of Birth</label>
            <input type="date" className="form-control bg-transparent text-info" required onChange={(e) => setDob(e.target.value)} />
          </div>
        </div>

        {/* Designation & Experience */}
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Designation</label>
            <input type="text" className="form-control bg-transparent text-info" onChange={(e) => setDesignation(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Experience</label>
            <input type="number" className="form-control bg-transparent text-info" onChange={(e) => setExp(e.target.value)} />
          </div>
        </div>

        {/* Address */}
        <div className="col">
          <label className="form-label text-info">Address</label>
          <input type="text" className="form-control bg-transparent text-info" onChange={(e) => setAddress(e.target.value)} />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label d-block text-info">Gender</label>
          <div className="form-check form-check-inline">
            <input className="form-check-input bg-transparent text-info" type="radio" name="gender" value="Male" onChange={(e) => SetGender(e.target.value)} />
            <label className="form-check-label text-info">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input bg-transparent text-info" type="radio" name="gender" value="Female" onChange={(e) => SetGender(e.target.value)} />
            <label className="form-check-label text-info">Female</label>
          </div>
        </div>

       
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info ">Status</label>
            <select className="form-select text-info "  onChange={(e) => setStatus(e.target.value)} required>
              <option value="" className='bg-transparent'>Select status</option>
              <option value="Active" className='bg-transparent'>Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          {/* <div className="col-md-6">
            <label className="form-label text-info">Profile</label>
            <input type="file" className="form-control bg-transparent text-info" accept="image/*" onChange={handleImg} />
          </div> */}
        </div>

        
        <div className="mb-3">
          <label className="form-label text-info">Reporting Manager</label>
          <input type="text" className="form-control bg-transparent text-info" onChange={(e) => setReportingManager(e.target.value)} />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? "Saving..":"Submit" }</button>
        </div>
      </form>
    </div>
  )
}


