import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function NewUserRegister() {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [gender, setGender] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [empId, setEmpId] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState({});
  const [dob,setDob]=useState('')
  const [exp,setExp]=useState('')
  const [address,setAddress]=useState('')
  let [profile, setProfile] = useState('');  
  const [loading, setLoading] = useState(false); 
  let app="http://56.228.33.57:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";

 
const navigate = useNavigate();


  const validateForm = () => {
  const contactPattern = /^[0-9]{10}$/;
  const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const newErrors = {};

  if (!firstName) newErrors.firstName = "First name is required.";
  if (!lastName) newErrors.lastName = "Last name is required.";
  if (!email) newErrors.email = "Email is required.";
  else if (!emailPattern.test(email)) newErrors.email = "Email must be a valid Gmail address.";

  if (!contactNo) newErrors.contactNo = "Contact number is required.";
  else if (!contactPattern.test(contactNo)) newErrors.contactNo = "Contact number must be 10 digits.";

  if (!userName) newErrors.userName = "Username is required.";
  if (!password) newErrors.password = "Password is required.";
  if (!conPassword) newErrors.conPassword = "Confirm your password.";
  else if (password !== conPassword) newErrors.conPassword = "Passwords do not match.";

  if (!role) newErrors.role = "Role is required.";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};


let handleImg = (event) => {
    var file = event.target.files[0];
    var filepath = `./img/${file.name}`;
    setProfile(filepath);
    console.log(filepath);
  };


  const addUser = (e) => {

    e.preventDefault();
    if (!validateForm()) return;
  

    const user = {
  firstName,
  lastName,
  email,
  contactNo: parseInt(contactNo),
  gender,
  userName,
  password,
  conPassword,
  empId: empId ? parseInt(empId) : null,
  role,
  dob,
  exp,
  address,
  profile    
};
  setLoading(true);
axios.post(`${app}/reg_user`, user)
// axios.post("http://localhost:8080/reg_user", user)

      .then((response) => {
       
         toast.success(response.data);
         navigate('/home');
        })
     
      .catch((systemError)=>{
        toast.error(systemError)}
      )
      .finally(() => setLoading(false));

  };


   let backToHomePage=()=>{
    navigate('/home')
   }
  return (
    <div className="container mt-4"  >  
      <form onSubmit={addUser} className="p-4 border rounded shadow" style={{"background-color": "#d03310b5"}}>
        <h2 className="mb-4 text-center text-primary">Register New User</h2>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">First Name</label>
            <input
              type="text"
                className={`form-control bg-transparent ${errors.firstName ? 'is-invalid' : 'text-info'}`}
                 onChange={(e) => setFirstName(e.target.value)}
                     />
            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Last Name</label>
            <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setLastName(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Email</label>
           <input
                  type="email"
                  className={`form-control bg-transparent ${errors.email ? 'is-invalid' : 'text-info'}`}
                   onChange={(e) => setEmail(e.target.value)}
                 />
              {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Contact No</label>
            <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setContactNo(e.target.value)} />
          </div>
            
          <div className="col-md-6">
            <label className="form-label text-info">Date Of Birth</label>
            <input type="date" className="form-control bg-transparent text-info" required onChange={(e) => setDob(e.target.value)} />   
          
            
          </div>
          <div className="col-md-6">
          <label className="form-label text-info">Address</label>
          <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setAddress(e.target.value)}  />
        
        </div>
        </div>
        
        
        <div className="row mb-3">
          <label className="form-label text-info">Gender</label>
          <div className='col-md-6'>
          
            <div className="form-check form-check-inline ">
              <input className="form-check-input bg-transparent text-info" type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} />
              <label className="form-check-label text-info">Male</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input bg-transparent text-info" type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} />
              <label className="form-check-label text-info">Female</label>
            </div>
            
          </div>
          
            <div className="col-md-6">
              <label className="form-label text-info">Experience</label>
              <input type="number" className="form-control bg-transparent text-info" onChange={(even) => setExp(even.target.value)}  />
             </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Username</label>
            <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Role</label>
            <input type="text" className="form-control bg-transparent text-info" required onChange={(e) => setRole(e.target.value)} />
          </div>
          
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Password</label>
            <input type="password" className="form-control bg-transparent text-info" required onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">Confirm Password</label>
            <input type="password" className="form-control bg-transparent text-info" required onChange={(e) => setConPassword(e.target.value)} />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label text-info">Employee ID</label>
            <input type="text" className="form-control bg-transparent text-info" onChange={(e) => setEmpId(e.target.value)} />
          </div>
          <div className="col-md-6">
            <label className="form-label text-info">User ID (Optional)</label>
            <input type="text" className="form-control bg-transparent text-info" onChange={(e) => setUserId(e.target.value)} />
          </div>
        </div>

         <div className="col-md-6 ">
            <label className="form-label text-info">Profile</label>
            <input type="file" className="form-control bg-transparent text-info " accept="image/*" onChange={handleImg} required />
          </div>
 <br /><br />
        <div className="row mb-3">
          <div className="col-md-6 text-center">
            <button type="submit" className="btn border border-dark-1 text-info px-4" disabled={loading}>{loading ? "Please wait..." : "Save"}</button>
          </div>
          <div className="col-md-6 text-end">
            <button type="button" className="btn border border-dark-1 text-info px-4"
              onClick={backToHomePage}>Back Home</button>
          </div>
        </div>
      </form>
    </div>
  );
}
// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// export default function NewUserRegister() {
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [contactNo, setContactNo] = useState('');
//   const [gender, setGender] = useState('');
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const [conPassword, setConPassword] = useState('');
//   const [empId, setEmpId] = useState('');
//   const [role, setRole] = useState('');
//   const [dob, setDob] = useState('');
//   const [exp, setExp] = useState('');
//   const [address, setAddress] = useState('');
//   const [profile, setProfile] = useState(null);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);

//   let app="http://13.60.174.101:8080/EmployeeManagementSystem-0.0.1-SNAPSHOT";
//   const navigate = useNavigate();

//   const validateForm = () => {
//     const contactPattern = /^[0-9]{10}$/;
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
//     const newErrors = {};

//     if (!firstName) newErrors.firstName = "First name is required.";
//     if (!lastName) newErrors.lastName = "Last name is required.";
//     if (!email) newErrors.email = "Email is required.";
//     else if (!emailPattern.test(email)) newErrors.email = "Email must be a valid Gmail address.";
//     if (!contactNo) newErrors.contactNo = "Contact number is required.";
//     else if (!contactPattern.test(contactNo)) newErrors.contactNo = "Contact number must be 10 digits.";
//     if (!userName) newErrors.userName = "Username is required.";
//     if (!password) newErrors.password = "Password is required.";
//     if (!conPassword) newErrors.conPassword = "Confirm your password.";
//     else if (password !== conPassword) newErrors.conPassword = "Passwords do not match.";
//     if (!role) newErrors.role = "Role is required.";
//     if (!dob) newErrors.dob = "Date of birth is required.";
//     if (!gender) newErrors.gender = "Gender is required.";
//     if (!address) newErrors.address = "Address is required.";
//     if (!exp) newErrors.exp = "Experience is required.";
//     if (!profile) newErrors.profile = "Profile picture is required.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleImg = (event) => {
//     const file = event.target.files[0];
//     setProfile(file);
//   };

//   const addUser = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     const formData = new FormData();
//     formData.append('firstName', firstName);
//     formData.append('lastName', lastName);
//     formData.append('email', email);
//     formData.append('contactNo', parseInt(contactNo));
//     formData.append('gender', gender);
//     formData.append('userName', userName);
//     formData.append('password', password);
//     formData.append('conPassword', conPassword);
//     formData.append('empId', empId ? parseInt(empId) : '');
//     formData.append('role', role);
//     formData.append('dob', dob);
//     formData.append('exp', exp);
//     formData.append('address', address);
//     formData.append('profile', profile);

//     setLoading(true);

//     axios.post(`${app}/reg_user`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//       .then((response) => {
//         toast.success(response.data);
//         navigate('/home');
//       })
//       .catch((error) => {
//         toast.error("Registration failed: " + (error.response?.data || error.message));
//       })
//       .finally(() => setLoading(false));
//   };

//   const backToHomePage = () => {
//     navigate('/home');
//   };

//   return (
//     <div className="container mt-4">
//       <form onSubmit={addUser} className="p-4 border rounded shadow" style={{ backgroundColor: "#f5f5f589" }}>
//         <h2 className="mb-4 text-center text-primary">Register New User</h2>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label text-dark">First Name</label>
//             <input type="text" className={`form-control bg-transparent ${errors.firstName ? 'is-invalid' : 'text-info'}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled={loading} />
//             {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
//           </div>
//           <div className="col-md-6">
//             <label className="form-label text-info">Last Name</label>
//             <input type="text" className={`form-control bg-transparent ${errors.lastName ? 'is-invalid' : 'text-info'}`} value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={loading} />
//             {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label text-info">Email</label>
//             <input type="email" className={`form-control bg-transparent ${errors.email ? 'is-invalid' : 'text-info'}`} value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
//             {errors.email && <div className="text-danger">{errors.email}</div>}
//           </div>
//           <div className="col-md-6">
//             <label className="form-label text-info">Contact No</label>
//             <input type="text" className={`form-control bg-transparent ${errors.contactNo ? 'is-invalid' : 'text-info'}`} value={contactNo} onChange={(e) => setContactNo(e.target.value)} disabled={loading} />
//             {errors.contactNo && <div className="text-danger">{errors.contactNo}</div>}
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label text-info">Date Of Birth</label>
//             <input type="date" className={`form-control bg-transparent ${errors.dob ? 'is-invalid' : 'text-info'}`} value={dob} onChange={(e) => setDob(e.target.value)} disabled={loading} />
//             {errors.dob && <div className="text-danger">{errors.dob}</div>}
//           </div>
//           <div className="col-md-6">
//             <label className="form-label text-info">Address</label>
//             <input type="text" className={`form-control bg-transparent ${errors.address ? 'is-invalid' : 'text-info'}`} value={address} onChange={(e) => setAddress(e.target.value)} disabled={loading} />
//             {errors.address && <div className="text-danger">{errors.address}</div>}
//           </div>
//         </div>

//         <div className="row mb-3">
//           <label className="form-label text-info">Gender</label>
//           <div className="col-md-6">
//             <div className="form-check form-check-inline">
//               <input className="form-check-input" type="radio" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} disabled={loading} />
//               <label className="form-check-label text-info">Male</label>
//             </div>
//             <div className="form-check form-check-inline">
//               <input className="form-check-input" type="radio" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} disabled={loading} />
//               <label className="form-check-label text-info">Female</label>
//             </div>
//             {errors.gender && <div className="text-danger">{errors.gender}</div>}
//           </div>
//           <div className="col-md-6">
//             <label className="form-label text-info">Experience</label>
//             <input type="number" className={`form-control bg-transparent ${errors.exp ? 'is-invalid' : 'text-info'}`} value={exp} onChange={(e) => setExp(e.target.value)} disabled={loading} />
//             {errors.exp && <div className="text-danger">{errors.exp}</div>}
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label text-info">Username</label>
//             <input type="text" className={`form-control bg-transparent ${errors.userName ? 'is-invalid' : 'text-info'}`} value={userName} onChange={(e) => setUserName(e.target.value)} disabled={loading} />
//             {errors.userName && <div className="text-danger">{errors.userName}</div>}
//           </div>
//           <div className="col-md-6">
//             <label className="form-label text-info">Role</label>
//             <input type="text" className={`form-control bg-transparent ${errors.role ? 'is-invalid' : 'text-info'}`} value={role} onChange={(e) => setRole(e.target.value)} disabled={loading} />
//             {errors.role && <div className="text-danger">{errors.role}</div>}
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label text-info">Password</label>
//             <input type="password" className={`form-control bg-transparent ${errors.password ? 'is-invalid' : 'text-info'}`} value={password} onChange={(e) => setPassword(e.target.value)} disabled={loading} />
//             {errors.password && <div className="text-danger">{errors.password}</div>}
//           </div>
//           <div className="col-md-6">
//             <label className="form-label text-info">Confirm Password</label>
//             <input type="password" className={`form-control bg-transparent ${errors.conPassword ? 'is-invalid' : 'text-info'}`} value={conPassword} onChange={(e) => setConPassword(e.target.value)} disabled={loading} />
//             {errors.conPassword && <div className="text-danger">{errors.conPassword}</div>}
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6">
//             <label className="form-label text-info">Employee ID</label>
//             <input type="text" className="form-control bg-transparent text-info" value={empId} onChange={(e) => setEmpId(e.target.value)} disabled={loading} />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label text-info">Profile</label>
//             <input type="file" className={`form-control bg-transparent ${errors.profile ? 'is-invalid' : 'text-info'}`} accept="image/*" onChange={handleImg} disabled={loading} />
//             {errors.profile && <div className="text-danger">{errors.profile}</div>}
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col-md-6 text-center">
//             <button type="submit" className="btn border border-dark-1 text-info px-4" disabled={loading}>{loading ? "Please wait..." : "Save"}</button>
//           </div>
//           <div className="col-md-6 text-end">
//             <button type="button" className="btn border border-dark-1 text-info px-4" onClick={backToHomePage}>Back Home</button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// }

