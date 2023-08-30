import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Search.css';
import { FaCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2'

function Search() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [roomType, setRoomType] = useState('Single');
  const [numberOfRooms, setNumberOfRooms] = useState(1);
  const [availabilityMessage, setAvailabilityMessage] = useState('');
  const [SerachStartDate, setSerachStartDate] = useState();
  const [SerachEndDate, setSerachEndDate] = useState();
  const [SerachPersonsCount, SetSerachPersonsCount] = useState();
  const [searchParams, setBookingSerach] = useSearchParams();
  

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleNumberOfPersonsChange = (event) => {
    setNumberOfPersons(event.target.value);
  };

  const handleRoomTypeChange = (event) => {
    setRoomType(event.target.value);
  };

  const handleNumberOfRoomsChange = (event) => {
    setNumberOfRooms(event.target.value);
  };

  const today = new Date();

  const checkAvailability = () => {
    // Make the API call to check room availability
    console.log(roomType ,numberOfRooms)
    axios.get(`http://localhost:8080/room/check-availability?roomType=${roomType}&noOfRooms=${numberOfRooms}`)
      .then((response) => {
        if (response.data == "Rooms are available!") {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Rooms are available!',
            showConfirmButton: false,
            timer: 1500
          });
         
        } else {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Rooms are not available.',
            showConfirmButton: false,
            timer: 1500
          });
         
        }
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error checking availability:', error);
      });
  };

  const sendDataBooking =(startDate ,endDate , numberOfPersons) => {
    setSerachStartDate(startDate);
    setSerachEndDate(endDate);
    SetSerachPersonsCount(numberOfPersons)
    setBookingSerach({ startDate,endDate,numberOfPersons});

  }

  return (
    <div className="header-container">
      <div className="header-image">
        <div className="search-container">
          <div className="date-picker-container">
            <label>
              <FaCalendarAlt className="date-picker-icon" />
              Start Date:
            </label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              minDate={today}
              className="date-picker"
            />
          </div>
          <div className="date-picker-container">
            <label>
              <FaCalendarAlt className="date-picker-icon" />
              End Date:
            </label>
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              minDate={startDate}
              className="date-picker"
            />
          </div>
          <div className="count-container">
            <label>Persons Count:</label>
            <select value={numberOfPersons} onChange={handleNumberOfPersonsChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
            </select>
          </div>
          <div className="count-container">
            <label>Room Type:</label>
            <select value={roomType} onChange={handleRoomTypeChange}>
              <option value="Single">Single</option>
              <option value="Double">Double</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Family">Family</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <div className="count-container">
            <label>Rooms Count:</label>
            <select value={numberOfRooms} onChange={handleNumberOfRoomsChange}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </select>
          </div>
          <div className="check-availability-container">
            <button className="check-availability-button" onClick={checkAvailability}>
              Check Availability
            </button>
            <div className="availability-message">{availabilityMessage}</div>
            
          </div>
          <div className="setDatesContiner">
            <button className="setDates" onClick={()=>sendDataBooking(startDate,endDate,numberOfPersons)}>
              Start Booking
            </button>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
