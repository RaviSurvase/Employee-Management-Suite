import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function LeaveApplicationForm() {
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState(null);
  const [showLeaveStatus, setShowLeaveStatus] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 
let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";

  const [formData, setFormData] = useState({
    email: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit leave application
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    // axios.put("http://localhost:8080/apply-leave", formData)
    axios.put(`${app}/apply-leave`,formData)
      .then((res) => {
        setMessage(res.data.message || " Leave applied successfully.");
        setFormData({
          email: "",
          startDate: "",
          endDate: "",
          reason: "",
        });
      
        setTimeout(() => {
          navigate('/showAllEmployeeListForEmp');
        }, 1000);
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || " Something went wrong.";
        setMessage(errorMsg);
      })
      .finally(setLoading(true))
  };


 const fetchLeaveStatus = () => {
  const email = prompt("Enter employee email to check leave status:");

  if (!email || !email.trim()) {
    setMessage("❗ Email is required.");
    return;
  }

  // axios.get("http://localhost:8080/get-leave-status", {
  axios.get(`${app}/get-leave-status`, {
    params: { email }
  })
    .then((res) => {
      setLeaveData(res.data);              
      setShowLeaveStatus(true);            
      setMessage("");
    })
    .catch((err) => {
      const msg = err.response?.data?.message || " Failed to fetch leave status.";
      setMessage(msg);
      setShowLeaveStatus(false);
    });
};


  // Close leave status box
  const closeLeaveStatus = () => {
    setShowLeaveStatus(false);
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow">
      <h2 className="mb-4 text-center text-primary">Leave Application</h2>

      {/* Leave Status Button */}
      <div className='text-end'>
        <button
          type="button"
          className="mb-4 text-primary text-info bg-transparent border-0"
          onClick={fetchLeaveStatus}>
          Get Leave Status
        </button>
      </div>

      {/* Leave Status Info */}
      {showLeaveStatus && (
  <div className="border rounded p-3 mb-4 bg-light position-relative">
    <button
      onClick={closeLeaveStatus}
      className="btn-close position-absolute top-0 end-0 m-2"
      aria-label="Close"
    ></button>
    <h5 className="text-info">Leave Status</h5>
    <p className="text-dark">✅ Available Leaves: <strong>{leaveData.available}</strong></p>
    <p className="text-dark">📅 Past Taken Leaves: <strong>{leaveData.past}</strong></p>
  </div>
)}

    
      {message && (
        <div className={`alert ${message.startsWith("✅") ? "alert-success" : "alert-danger"} text-center`}>
          {message}
        </div>
      )}

   
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-info">Email</label>
          <input
            type="email"
            name="email"
            required
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-info">Start Date</label>
          <input
            type="date"
            name="startDate"
            required
            className="form-control"
            value={formData.startDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-info">End Date</label>
          <input
            type="date"
            name="endDate"
            required
            className="form-control"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-info">Reason</label>
          <textarea
            name="reason"
            required
            className="form-control"
            value={formData.reason}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>{loading ?"Wait...":"Apply Leave" }</button>
      </form>

      <div className="text-end mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/showAllEmployeeListForEmp')}>
          Back to Employee Page
        </button>
      </div>
    </div>
  );
}
