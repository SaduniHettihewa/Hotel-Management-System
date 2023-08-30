import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './welcomeScreen.css';
import UserLogin from '../UserModule/UserLogin';

function WelcomePage() {
  const navigate = useNavigate();

  function handleUserClick() {
    window.location.reload();
  }
 
  // Callback function to handle successful login
  const handleLoginSuccess = () => {
    navigate('/home'); // Navigate to the Home screen
  };

  return (
    <div className="container-fluid welcome-page blur-effect">
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleUserClick}>
                User
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={handleUserClick}>
                Admin
              </button>
            </li>
          </ul>
        </div>
      </nav> */}
      <div className="welcome-content">
  <center>
    <table className="welcome-content">
      <tr>
        {/* <center>  <td colSpan={3} style={{ padding: '50px' }}>  <div className="title-box"><h1   style={{color:'white'}}>Welcome</h1> </div> </td></center> */}
      </tr>
      <tr>
        <td style={{ padding: '50px' }}>
          <div className="title-box">
            <h1 className="title text-center">Suhadha Villa Resort</h1>
          </div>
        </td>
        <td style={{ padding: '50px' }}>
          <div className="user-signup-wrapper">
            <UserLogin onLoginSuccess={handleLoginSuccess} />
          </div>
        </td>
      </tr>
    </table>
  </center>
</div>

    </div>
  );
}

export default WelcomePage;
