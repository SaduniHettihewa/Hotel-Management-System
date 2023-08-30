import React, { useState } from 'react';
import UserLogin from './UserLogin';
import axios from 'axios';
import Swal from 'sweetalert2'


function UserSignUp  (){
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignupMode, setIsSignupMode] = useState(false);


const SubmitSignUP = async (e) => {
  
  try {
    // Create a data object with the user signup details
    const data = {
      fullName,
      phoneNumber,
      email,
      password,
    };

    // Check if any of the required fields are empty
  if (!fullName || !phoneNumber || !email || !password) {
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Please fill in all the details',
      showConfirmButton: false,
      timer: 1500
    });
    return;
  }

    // Create a new URLSearchParams object
    const params = new URLSearchParams();

    // Add the parameters to the URLSearchParams object
    Object.entries(data).forEach(([key, value]) => {
      params.append(key, value);
    });

    // Construct the query string from the URLSearchParams object
    const queryString = params.toString();
    // Make an Axios POST request to your Maven backend API endpoint
    console.log(queryString);
    const response = await axios.post(`http://localhost:8080/customers/addCustomer?${queryString}` );

    // Handle the response from the backend
    console.log(response.data);
    if (response.data === 'User details added') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Successfully create your account',
        showConfirmButton: false,
        timer: 1500
      });

      // Wait for 1.5 seconds (1500 milliseconds)
      setTimeout(() => {
        // Reload the page
        window.location.reload();
      }, 1500);
    } else if (response.data === 'Email already exists'){
      
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Email is already exists',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Check your Details again',
        showConfirmButton: false,
        timer: 1500
      });
    }
  } catch (error) {
    // Handle error responses
    console.error(error);
  }
};







  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here
    console.log('Form submitted');
  };

  const handleToggleMode = () => {
    setIsSignupMode(!isSignupMode);
  };


  return (
    <div style={{ float: 'right' }}>
         {isSignupMode ? (
        <UserLogin /> // Render the UserSignUp component when in signup mode
      ) : (
      <form
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          padding: '40px',
          margin: '40px',
        }}
        onSubmit={handleSubmit}
      >
        
       <h3> SignUp </h3>
        <label style={{  fontSize: '20px', color: 'black' , fontWeight:'bold'}}>
          Full Name :
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{
              margin: '10px 0',
              padding: '10px',
              fontSize: '22px',
              borderRadius: '10px',
            }}
          />
        </label>
        <label style={{  fontSize: '20px', color: 'black' , fontWeight:'bold' }}>
          Phone Number  :
        
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            style={{
              margin: '10px 0',
              padding: '10px',
              fontSize: '22px',
              borderRadius: '10px',
            }}
          />
         </label>
        <label style={{ fontSize: '20px', color: 'black' , fontWeight:'bold' }}>
          Email :
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
        <label style={{ fontSize: '20px', color: 'black' , fontWeight:'bold' }}>
          Password  :  
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
            fontSize: '18px',
          }}
          onClick={SubmitSignUP}
        >
          Sign Up
        </button>
        <h6>
            Already have an Account? <a onClick={handleToggleMode}>Sign In</a>
          </h6>
      </form>
      )}
    </div>
  );
};

export default UserSignUp;
