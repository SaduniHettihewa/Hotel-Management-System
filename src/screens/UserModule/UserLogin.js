import React, { useState } from 'react';
import axios from 'axios';
import './UserSignUp'; // Import the UserSignUp component
import UserSignUp from './UserSignUp';
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom';




const UserLogin = ({onLoginSuccess}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupMode, setIsSignupMode] = useState(false);
  const navigate = useNavigate();
  
const [admin , setAdmin] = useState('');

  const LoginUsers = async (e) => {
    e.preventDefault();
  
    try {
      if (email === "admin123@gmail.com" && password === "123") {
        const user = 'admin';
        setAdmin(user);
        localStorage.setItem("user", user);
        // Navigate to the Admin dashboard
        console.log("////////////////////");
        console.log(localStorage.getItem("user"));
        console.log("////////////////////");
        navigate('/admin-dashboard');
      } else {
        const response = await axios.post(
          `http://localhost:8080/customers/login?email=${email}&password=${password}`
        );
  
        localStorage.setItem("userEmail", email);
        console.log(localStorage.getItem("userEmail"));
        // Handle the response from the backend
        console.log(response.data);
        if (response.data === "Email not found") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Check your email address",
            showConfirmButton: false,
            timer: 1500,
          });
  
          // Email not found
          console.log("Email not found");
        } else if (response.data === "Invalid password") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Invalid password",
            showConfirmButton: false,
            timer: 1500,
          });
          // Invalid password
          console.log("Invalid password");
        } else if (response.data === "Login successful") {
          if (onLoginSuccess && typeof onLoginSuccess === "function") {
           navigate('/admin-dashboard')
          }
  
          // Login successful
          console.log("Login successful");
        } // Replace this with your desired logic
      }
    } catch (error) {
      // Handle error responses
      console.error(error);
    }
  };
  

  const handleToggleMode = () => {
    setIsSignupMode(!isSignupMode);
  };

  return (
    <div style={{ float: 'center' }}>
      {isSignupMode ? (
        <UserSignUp /> // Render the UserSignUp component when in signup mode
      ) : (
        <form
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: '40px',
            paddingTop:'80px',
            margin: '40px',
          }}
          onSubmit={LoginUsers}
        >
          {/* UserLogin form fields */}
          <center> <h3> Login</h3></center>
         
          <label style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                margin: '10px 0',
                padding: '10px',
                fontSize: '22px',
                borderRadius: '10px',
              }}
            />
          </label>
          <label style={{ fontSize: '20px', color: 'black', fontWeight: 'bold' }}>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                margin: '10px 0',
                padding: '10px',
                fontSize: '22px',
                borderRadius: '10px',
              }}
            />
          </label>
          <button
            type="submit"
            style={{
              backgroundColor: 'rgb(0, 150, 255)',
              color: 'white',
              padding: '10px',
              borderRadius: '10px',
              marginTop: '10px',
              marginBottom: '10px',
              fontSize: '18px',
              width: 100
            }}
          >
            Login
          </button>
          <h6>
            Don't have an Account ? <a onClick={handleToggleMode}>  Sign Up </a>
          </h6>
        </form>
      )}
    </div>
  );
};

export default UserLogin;
