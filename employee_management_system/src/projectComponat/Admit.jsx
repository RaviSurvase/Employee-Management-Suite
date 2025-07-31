import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
  const [employees, setEmployees] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lName, setLName] = useState('');
  const [desig, setDesig] = useState('');
  const [dept, setDept] = useState('');
let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";

  const navigate = useNavigate();

  useEffect(() => {
    // fetchEmployees();

  }, []);
  const searchByFirstName = () => {


    console.log(firstName)
     axios.get(`${app}/get_emp_data_by_firstname?empFirstName=${firstName}`)
      // axios.get(`http://localhost:8080/get_emp_data_by_firstname?empFirstName=${firstName}`)
     .then((response)=>{
        setEmployees(response.data)
     })
     .catch((error)=>{
        alert(error)
     })
  };
   const displayEmployees = searchResults.length > 0 ? searchResults : employees;
  return (
    <div className="container">
      <div className="row g-3 mb-3">
        <div className="col-md-3">
          <label>First Name:</label>
          <input type="text" className="form-control"  placeholder="First Name"value={firstName} 
          onChange={(event) => setFirstName(event.target.value)}
          
        
          
          />
         <button className="btn btn-info mt-2" onClick={searchByFirstName}>
            Search
          </button> 
        </div>

        <div className="col-md-3">
          <label>Last Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
          <button className="btn btn-info mt-2" >
            Search
          </button>
        </div>

        <div className="col-md-3">
          <label>Enter Designation:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Designation"
            value={desig}
            onChange={(e) => setDesig(e.target.value)}
          />
          <button className="btn btn-info mt-2" >
            Search
          </button>
        </div>

        <div className="col-md-3">
          <label>Enter Department:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Department"
            value={dept}
            onChange={(e) => setDept(e.target.value)}
          />
          <button className="btn btn-info mt-2" >
            Search
          </button>
        </div>
      </div>

      <div className="container mt-4">
        <h2 className="text-center mb-4 text-primary fw-bold">Employee Directory</h2>

        <div className="row">
          {displayEmployees.length === 0 ? (
            <div className="col-12 text-center text-muted">No employee data available.</div>
          ) : (
            displayEmployees.map((employee) => (
              <div className="col-md-4 mb-4" key={employee.emId}>
                <div className="card h-100 border-0 shadow-sm rounded-4">
                  <img
                    src={employee.profile}
                    alt="Profile"
                    className="card-img-top rounded-top"
                    style={{ objectFit: 'cover', height: '200px' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-dark fw-semibold">
                      {employee.firstName} {employee.lastName}
                    </h5>
                    <p className="card-text text-secondary small">
                      <strong>Email:</strong> {employee.email}
                      <br />
                      <strong>Contact:</strong> {employee.contactNo}
                      <br />
                      <strong>Department:</strong> {employee.department}
                      <br />
                      <strong>Designation:</strong> {employee.designation}
                      <br />
                      <strong>Salary:</strong> ₹{employee.salary}/month
                      <br />
                      <strong>Status:</strong> {employee.status}
                      <br />
                      <strong>Experience:</strong> {employee.exp} years
                    </p>
                  </div>
                  <div className="card-footer bg-white border-top-0 d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary"
                    //   onClick={() => handleUpdate(employee.emId)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                    //   onClick={() => handleDelete(employee.emId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}