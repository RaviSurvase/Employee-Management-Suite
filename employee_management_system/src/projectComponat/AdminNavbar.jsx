
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function AdminNavbar() {
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); 

  
  useEffect(() => {
    const stored = localStorage.getItem("loggedInEmployee");    
    setEmployee(stored ? JSON.parse(stored) : null);
  }, [location]); 

  const handleLogout = () => {
    localStorage.removeItem("loggedInEmployee");
    setEmployee(null);
    navigate("/home");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark  p-3">
        <div className="container flex-column align-items-start">
          
         
          {employee && (
            <div className="w-100 d-flex justify-content-end align-items-center mb-1 pe-2" style={{ fontSize: "0.8rem", color: "white" }}>
              <img
                src={employee.profile}
                alt="profile"
                style={{ width: "25px", height: "25px", borderRadius: "50%", objectFit: "cover", marginRight: "6px" }}
              />
              {employee.firstName} {employee.lastName}
              <button className="btn btn-sm btn-outline-light ms-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}

          {/* Navbar */}
          <div className="w-100 d-flex justify-content-between align-items-center">
            <h1 className="navbar-brand m-0">
              <img src="img/logo.jpeg" alt="Logo" style={{ borderRadius: "9rem", height: "5rem", width: "5rem" }} />
            </h1>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to='/home' className='nav-link fs-4' style={{ color: 'hsla(0, 0%, 100%, 0.99)' }}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link to='/servicesPage' className='nav-link fs-4' style={{ color: 'hsla(0, 0%, 100%, 0.99)' }}>Services</Link>
                </li>
                <li className="nav-item">
                 
                  <Link to='/home#footer' className='nav-link fs-4' style={{ color: 'hsla(0, 0%, 100%, 0.99)' }}>About</Link>
                  {/* <a className="nav-link fs-4" href="#" style={{ color: 'hsla(0, 0%, 100%, 0.99)' }}>Contact</a> */}
                </li>
                <li className="nav-item">
                  <a className="nav-link fs-4" href="#" style={{ color: 'hsla(0, 0%, 100%, 0.99)' }}>Contact</a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </nav>
    </div>
  );
}
