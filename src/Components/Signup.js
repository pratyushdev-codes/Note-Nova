import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/newuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account Created!", "success");
    } else {
      props.showAlert("Invalid Credentials", "danger");
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ textAlign: 'left' }}>
      <style>
        {`
          .banner-image {
            width: 96vw;
            object-fit: cover;
            border-radius: 20px;
          }
        `}
      </style>
      <img src="./images/banner.jpg" className="banner-image img-fluid" alt="" />
    
      <div className='mt-2'>
        <h2>SignUp to continue to NoteNova</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" style={{backgroundColor:"#7637A0",borderColor:"black"}}onChange={onchange} value={credentials.name} name='name' />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" onChange={onchange} value={credentials.email} name='email' />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onchange} minLength={5} required id="password" name='password' />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" value={credentials.cpassword} onChange={onchange} minLength={5} required id="cpassword" name='cpassword' />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
