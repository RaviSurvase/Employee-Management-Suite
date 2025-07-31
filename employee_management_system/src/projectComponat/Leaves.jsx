import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Leaves() {
      const [rejectReasonMap, setRejectReasonMap] = useState({});
      const [showReasonMap, setShowReasonMap] = useState({});
      const [leaveDaysMap, setLeaveDaysMap] = useState({});
      const [employee, setEmployee] = useState([]);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false); 

let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";
  
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get(`${app}/get_application_leaves`)
    // axios.get("http://localhost:8080/get_application_leaves")  
      .then((response) => {
        setEmployee(response.data);
        const daysMap = {};
        response.data.forEach(emp => {
          
        const start = new Date(emp.startDate);
        const end = new Date(emp.endDate);

        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        daysMap[emp.empId] = totalDays;
        });
          setLeaveDaysMap(daysMap);

      })
      .catch((error) => {
        toast.error("Error fetching data: " + error);
      });
  }; 

    let leaveApprove  = (empId) => {
        const days = leaveDaysMap[empId];
        setLoading(true)
  axios.put(`${app}/update_leave_approve_status/${empId}/${days}`)
  // axios.put(`http://localhost:8080/update_leave_approve_status/${empId}/${days}`)
    .then((response) => {
      toast.success("Leave approved");
      getData();
    })
    .catch((error) => {     
      toast.error("Error approving leave: " + error.message);
    })
    .finally(setLoading(false))
}; 
 
const rejectLeave = (empId) => {
  const reason = rejectReasonMap[empId];

  if (!reason || reason.length < 10) {
    toast.error("Reason must be at least 10 characters long.");
    return;
  }

  axios.put(`${app}/update_leave_reject_status/${empId}`, reason, {
    // axios.put(`http://localhost:8080/update_leave_reject_status/${empId}`, { reason }, {
  headers: { 'Content-Type': 'application/json' }
})

    .then(() => {
      toast.success("Leave rejected successfully");
      getData();
      
      setRejectReasonMap(prev => ({ ...prev, [empId]: '' }));
      setShowReasonMap(prev => ({ ...prev, [empId]: false }));
    })
    .catch((error) => {
      toast.error("Error rejecting leave: " + error.message);
    });
};

  


   let backToAdminPage=()=>{
    navigate('/showAllEmployeeList')
   }

  return (
    <div>
   <div className="container py-4">
    <div>
       <h1 className='btn btn-success bg-black text-info'>Filter Employee Information</h1><br />
       
     </div>  
  
</div>
    
    <div className='container mt-4 border border-dark rounded w-120' >
      <h2 className='mb-4 text-center text-info '>Employee List</h2>
      
      <div className='row'>
        {
          employee.length === 0 ? (
           <div className="text-center text-warning fw-bold fs-5 my-4">
              No leave applications found.
           </div>
          ) : ( employee).map((empData, index) => (
          <div className='col-12 col-sm-6 col-md-4 col-lg-3' key={empData.empId}>
            <div className="card h-100 shadow-sm ">
              
              <img src={empData.profile} className="card-img-top p-3 " alt="Profile" style={{"borderRadius" :"9rem", height: '15rem',objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title">
                  {empData.fullName}
                </h5>
                <p className="card-text">
                   <strong>Emp ID:</strong> {empData.empId}<br />
                  <strong>Joining Date:</strong> {empData.joiningDate}<br />
                  <strong>Contact:</strong> {empData.contactNo}<br />
                  <strong>Email:</strong> {empData.email}<br></br>
                   <strong>Reason :</strong> {empData.reason}<br />
                   <strong>To :</strong> {empData.startDate}<br />  
                   <strong>Up To:</strong> {empData.endDate}<br />

                   <strong>Total Days:</strong> {leaveDaysMap[empData.empId] ?? 0}<br />

                    
                   <strong>Leave Count:</strong> {empData.leaveCount}<br></br>

                   <strong>Past Leaves Info:</strong> {empData.pastLeavesInfo}
                </p>
                <button className='btn btn-success' onClick={() => leaveApprove(empData.empId) } disabled={loading}>{loading ? "Wait...":"Approve" }</button>

                <div className='d-flex justify-content-evenly'>
                  
                  <button
                        className='btn btn-danger'
                        onClick={() => setShowReasonMap(prev => ({ ...prev, [empData.empId]: true }))} disabled={loading}>{loading?"Wait...":"Rejected"} </button>

                        {showReasonMap[empData.empId] && (
                        <div className="mt-2">
                    <textarea
                       className="form-control"
                            placeholder="Enter reason (min 10 chars)..."
                            value={rejectReasonMap[empData.empId] || ""}
                            onChange={(e) =>
                            setRejectReasonMap(prev => ({
                            ...prev,
                              [empData.empId]: e.target.value
                            }))
                            }/>
                        <button
                        className="btn btn-danger mt-2"
                        disabled={!rejectReasonMap[empData.empId] || rejectReasonMap[empData.empId].length < 10}
                        onClick={() => rejectLeave(empData.empId)}>
                    Confirm Reject
                     </button>
                </div>
            )}

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
           <div className="col-md-6 text-end">
            <button type="button" className="btn border border-dark-1 text-info px-4"
              onClick={backToAdminPage}>Back Admin Page</button>
          </div>
    </div>
    </div>
  );
}
