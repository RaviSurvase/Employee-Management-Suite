import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function RegisterUserOnEmp() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [department, setDepartment] = useState('');
  const [salary, setSalary] = useState(0);
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState(0);
  const [joiningDate, setjoiningDate] = useState('');
  const [dob, setDob] = useState('');
  const [designation, setDesignation] = useState('');
  const [exp, setExp] = useState(0);
  const [address, setAddress] = useState('');
  const [gender, SetGender] = useState('');
  const [status, setStatus] = useState('');
  const [reportingManager, setReportingManager] = useState('');
  const [profile, setProfile] = useState('');
 let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";


  useEffect(() => {
    axios.get(`${app}/get_data_by_userid/${userId}`)
    //  axios.get(`http://localhost:8080/get_data_by_userid/${userId}`)
      .then((response) => {
        if (response.data) {
          const empdata = response.data;
          setFirstName(empdata.firstName);
          setLastName(empdata.lastName);
          setAddress(empdata.address);
          setContactNo(empdata.contactNo);
          setEmail(empdata.email);
          setExp(empdata.exp);
          setDob(empdata.dob);
          SetGender(empdata.gender);
          setProfile(empdata.profile);
        }
      })
      .catch((error) => {
        alert(error);
      });
  }, [userId]);

  const updateUserStatus = (user) => {
    setLoading(true)
    axios.put(`${app}/update_user_status/${user}`)
    // axios.put(`http://localhost:8080/update_user_status/${user}`)
      .then((response) => {
        toast.success(response.data); 
      })
      .catch((error) => {
       toast.error(error)
      })
      .finally(setLoading(false))
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setDepartment('');
    setSalary(0);
    setEmail('');
    setContactNo(0);
    setjoiningDate('');
    setDob('');
    setDesignation('');
    setExp(0);
    setAddress('');
    SetGender('');
    setStatus('');
    setReportingManager('');
    setProfile('');
  };

  const backTOAddNewEmpOnPortal = () => {
    resetForm();
    navigate('/addNewEmpOnPortal');
  };

  const handlsave = (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const newemp = {
      firstName, lastName, department, salary, email, contactNo,
      joiningDate, dob, designation, exp, address, gender, status,
      profile, reportingManager
    };

    axios.post(`${app}/add_new_emp_data`, newemp)
    // axios.post(`http://localhost:8080/add_new_emp_data`, newemp)
      .then((response) => {
        toast.success(response.data); 
        updateUserStatus(userId);
        resetForm();
        backTOAddNewEmpOnPortal();
      })
      .catch((error) => {
        toast.error("Something went wrong while saving.: "+error);
      })
       .finally(() => setLoading(false));
      
  };
const validateForm = () => {
  if (!department.trim()) {
    toast.error("Department is required");
    return false;
  }

  if (salary <= 0) {
    toast.error("Salary must be greater than 0");
    return false;
  }

  if (!joiningDate) {
    toast.error("Joining Date is required");
    return false;
  }

  if (!designation.trim()) {
    toast.error("Designation is required");
    return false;
  }

  if (!status) {
    toast.error("Please select a status");
    return false;
  }

  if (!reportingManager.trim()) {
    toast.error("Reporting Manager is required");
    return false;
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    toast.error("Invalid email address");
    return false;
  }

  if (!contactNo || contactNo.toString().length !== 10) {
    toast.error("Contact number must be 10 digits");
    return false;
  }

  return true;
};

  return (
    <div>
      <form onSubmit={handlsave} className="container mt-4 p-4 border">
        <h2 className="mb-4 text-center text-primary">Add Employee On Company</h2>
        <h3 className="mb-4 text-center text-danger">
          Employee Name is {firstName + " " + lastName}
        </h3>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Department</label>
            <input type="text" className="form-control bg-black text-info"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Salary</label>
            <input type="number" className="form-control bg-black text-info"
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Joining Date</label>
            <input type="date" className="form-control bg-black text-info"
              value={joiningDate}
              onChange={(e) => setjoiningDate(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Designation</label>
            <input type="text" className="form-control bg-black text-info"
              placeholder="Enter designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Status</label>
            <select className="form-select bg-black text-info"
              value={status}
              onChange={(e) => setStatus(e.target.value)}>
              <option disabled value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Reporting Manager</label>
            <input type="text" className="form-control bg-black text-info"
              placeholder="Enter manager name"
              value={reportingManager}
              onChange={(e) => setReportingManager(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6 text-center">
            <button type="submit" className="btn border border-dark-1 text-info px-4" disabled={loading}> {loading ? "Saving..." : "Save"}</button>
          </div>
          <div className="col-md-6 text-end">
            <button type="button" className="btn border border-dark-1 text-info px-4"
              onClick={backTOAddNewEmpOnPortal}>Back</button>
          </div>
        </div>
      </form>
    </div>
  );
} 
