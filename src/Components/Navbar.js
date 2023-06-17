import React from 'react';
import { Link,  useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <div className="container-fluid mx-auto">
        <Link className="navbar-brand" to="/">
          <img src="./images/icon.png" alt="Logo" className="d-inline-block mx-4" width="83" height="60" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2"><Link className="nav-link active" aria-current="page" to="/">Home</Link></li>
            <li className="nav-item mx-1"><Link className="nav-link active" to="/about">About</Link></li>
            <li className="nav-item mx-1"><Link className="nav-link active" to="/entertainment">Events</Link></li>
            <li className="nav-item mx-1"><Link className="nav-link active" to="/general">Team</Link></li>
            <li className="nav-item mx-1"><Link className="nav-link active" to="/health">Contact</Link></li>
          </ul>
          <form className="d-flex">
            {!localStorage.getItem('token') ? (
              <>
                <Link className="btn btn-primary mx-1" to="/login" style={{backgroundColor:'#7637A0', borderColor:"black"}} role="button">Login</Link>
                <Link className="btn btn-dark mx-1" to="/signup" role="button">Sign Up</Link>
              </>
            ) : (
              <button style={{backgroundColor:'#7637A0', borderColor:"black"}} onClick={handleLogout} className="btn btn-primary">Log Out</button>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
