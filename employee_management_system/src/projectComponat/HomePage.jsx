import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
export default function HomePage() {
const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";

  

  
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    setErrorMsg('');

   
    if (role === 'admin') {
      if (username === 'ravi' && password === '123') {
       
        navigate('/showAllEmployeeList');
      } else {
        toast.error('Invalid credentials for Admin.');

      }
    }
    else if (role === 'employee') {
      

        const loginDat = {
       userName: username,
        password: password
        };
      
      try {
  const response = await axios.post(`${app}/login`, loginDat);
  // const response = await axios.post('http://localhost:8080/login', loginDat);

  if (response.status === 200 && response.data) {
    localStorage.setItem("loggedInEmployee", JSON.stringify(response.data));
    navigate('/showAllEmployeeListForEmp');
    toast.success("Welcome Employee, Logged in successfully", {
        autoClose: 3000,
      });
      
    
  } else {
    toast.error("Login failed. Please check your credentials.");

  }
} catch (error) {
  if (error.response && error.response.status === 401) {
    toast.error("Invalid userName or password.");

  } else {
   toast.error("Server error. Please try again later.");

  }
}
      
    } else {
      setErrorMsg('Please select a role.');
    }
  };


  return (
    // <div className="homepage min-vh-100 d-flex flex-column " style={{ background: 'transparent', color: 'white',"background-color": "#99979a8f" }}>
     <div
  className="homepage min-vh-100 d-flex flex-column"
  style={{ backgroundColor: '#d8cdcdff', color: 'white' }}
>

      

     
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center border border-dark rounded w-50 " style={{"marginTop":"6rem",backgroundColor: '#570c0c70', color: 'white' }}>
        <section className="text-center p-5  rounded shadow w-100" style={{ maxWidth: "500px", height:"350px"}}>
          <form  onSubmit={(e) => e.preventDefault()}>
         <label  className="form-label text-info">Select Role</label>
         <select className="form-control bg-transparent text-primary"
         value={role}
          onChange={(event) => setRole(event.target.value)}
         >
          <option disabled value="">Select Role</option>

          <option value="admin" >Admin</option>
          <option value="employee">Employee</option>
         </select><br />



         <label  className="form-label text-info" >UserName</label>
         <input type="text" className='form-control bg-transparent text-primary'
         
         value={username}
          onChange={(e) => setUsername(e.target.value)}
         
         />
          <label  className="form-label text-info">Password</label>
            <input type="password" className='form-control bg-transparent text-primary' 
             
             value={password}
          onChange={(e) => setPassword(e.target.value)}


            />

            <div className='m-3 d-flex justify-content-between'>        
            <button
                className="btn btn-transparent border border-info text-primary"
                onClick={() => navigate('/newUserRegistration')}>
                 Sign Up
            </button>

            <button
                    type="button"
                     className="btn btn-transparent border border-info text-primary"
                      onClick={handleLogin}>
                      Sign In
            </button>

            <button className="btn btn-transparent border border-info text-danger">Forget Password</button>
            </div>
            </form>
        </section>
        
      </div>

    <div className="container-fluid text-white py-5" id="footer" style={{ fontSize: "18px","marginTop":"10rem", "background-color": "#2a19198f" }}>
  <div className="container">
    <div className="row text-center text-md-start">

      {/* Company Info */}
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase mb-3 text-light">Innovtive Technologies Pvt. Ltd.</h5>
        <p className="text-white-50">
          WorkWise is a leading provider of employee management and HR solutions, helping businesses streamline their workforce operations through intelligent automation, reporting, and analytics.
        </p>
      </div>

      {/* Contact Info */}
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase mb-3">Contact Information</h5>
        <p className="mb-2">
          <strong>📍 Address:</strong><br />
          5th Floor, TechPark Tower,<br />
          Balaji Nagar, Katraj, Pune - 411057,<br />
          Maharashtra, India
        </p>
        <p className="mb-1"><strong>📞 Phone:</strong> +91 7248961892</p>
        <p><strong>📧 Email:</strong> ravitsurvase@gmail.com</p>
      </div>

      {/* Quick Links */}
      <div className="col-md-4 mb-4">
        <h5 className="text-uppercase mb-3">Quick Links</h5>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white-50 text-decoration-none">Careers</a></li>
          <li><a href="#" className="text-white-50 text-decoration-none">Privacy Policy</a></li>
          <li><a href="#" className="text-white-50 text-decoration-none">Terms & Conditions</a></li>
          <li><a href="#" className="text-white-50 text-decoration-none">Blog</a></li>
          <li><a href="#" className="text-white-50 text-decoration-none">Help Center</a></li>
        </ul>

        <div className="mt-4 d-flex justify-content-center justify-content-md-start flex-wrap">
          <span className="me-3">🌐</span>
          <a href="#" ></a>
          <Link t="www.linkedin.com/in/ravi-surwase" className="text-white-50 me-3 text-decoration-none">LinkedIn</Link>
        </div>
      </div>

    </div>

    <hr className="border-secondary" />
    <div className="text-center text-white-50 pt-3">
      © 2025 <strong>Innovtive Technologies Pvt. Ltd.</strong> — All rights reserved.
    </div>
  </div>
</div>
<ToastContainer position="top-right" autoClose={3000} hideProgressBar />


    </div>
  );
}


