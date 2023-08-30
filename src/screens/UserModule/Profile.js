import React, { useEffect, useState } from 'react';
import './Profile.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faCalendar, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

export default function Profile({ email }) {
  const [profile, setProfile] = useState(null);
  const [bookings, setBookings] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`http://localhost:8080/customers/${userEmail}`);
  
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to fetch user profile');
      }
    } catch (error) {
      console.error('Error occurred while fetching user profile', error);
    }
  };
  
  const fetchBookings = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`http://localhost:8080/booking/${userEmail}`);
  
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        console.error('Failed to fetch bookings');
      }
    } catch (error) {
      console.error('Error occurred while fetching bookings', error);
    }
  };

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
      fetchUserProfile();
      fetchBookings();
    } else {
      console.error('Email not found in localStorage');
    }
  }, []);

  return (
    <div className="profile-container">
      {/* Profile Details */}
      <div className="profile-details">
        <h3><FontAwesomeIcon icon={faUser} /> Profile Details</h3>
        {profile && (
          <div>
            <p><FontAwesomeIcon icon={faUser} /> Name: {profile.fullName}</p>
            <p><FontAwesomeIcon icon={faPhone} /> Phone: {profile.phoneNumber}</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> Email: {profile.email}</p>
          </div>
        )}
      </div>

      {/* Booking Details */}
      <div className="booking-detils" style={{paddingLeft:'20px',paddingTop:'20px'}}>
        <h2 style={{color:'black'}}><FontAwesomeIcon icon={faCalendar} /> Booking Details</h2>
        {bookings && bookings.length > 0 ? (
          <table style={{border:'1px solid'}}>
            <thead >
              <tr style={{border:'1px solid'}}>
                <th style={{border:'1px solid',padding:'10px'}}>Check-in</th>
                <th style={{border:'1px solid',padding:'10px'}}>Check-out</th>
                <th style={{border:'1px solid',padding:'10px'}}>Room Type</th>
                <th style={{border:'1px solid',padding:'10px'}}>Total Amount Paid</th>
              </tr>
            </thead>
            <tbody style={{border:'1px solid'}} >
              {bookings.map((booking) => (
                <tr key={booking.bookingId}>
                  <td style={{border:'1px solid' ,padding:'20px'}}><FontAwesomeIcon icon={faCalendarAlt} /> {booking.checkInDate}</td>
                  <td style={{border:'1px solid',padding:'20px'}}><FontAwesomeIcon icon={faCalendarAlt} /> {booking.checkOutDate}</td>
                  <td style={{border:'1px solid',padding:'20px'}}><FontAwesomeIcon icon={faClock} /> {booking.roomType}</td>
                  <td style={{border:'1px solid',padding:'20px'}}>${booking.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings available</p>
        )}
      </div>
    </div>
  );
}
