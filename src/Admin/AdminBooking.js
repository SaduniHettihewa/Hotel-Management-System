import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export default function AdminBooking() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const tableRef = useRef(null);

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  // Function to fetch booking details
  const fetchBookingDetails = async () => {
    try {
      const response = await axios.get('http://localhost:8080/booking/all');
      setBookingDetails(response.data);
      calculateTotalAmount(response.data);
    } catch (error) {
      console.error('Error fetching booking details:', error);
    }
  };

  // Function to calculate the total amount
  const calculateTotalAmount = (data) => {
    const total = data.reduce((sum, booking) => sum + booking.totalAmount, 0);
    setTotalAmount(total);
  };

  // Function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString(); // Convert date to ISO string format
    fetchBookingDetails(formattedDate);
  };

  // Function to generate the report as PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Define table column headers and cell data
    const headers = ['ID', 'Check-in Date', 'Check-out Date', 'Email', 'Full Name', 'Phone Number', 'Room Type', 'Total Amount'];
    const data = bookingDetails.map((booking, index) => [
      index + 1,
      booking.checkInDate,
      booking.checkOutDate,
      booking.email,
      booking.fullName,
      booking.phoneNumber,
      booking.roomType,
      booking.totalAmount
    ]);

    // Set table styles
    const tableStyles = {
      theme: 'grid',
      styles: { lineColor: [0, 0, 0] }, // Set table border color to black
      headStyles: { fillColor: [200, 200, 200] }, // Set header row background color
      bodyStyles: { textColor: [0, 0, 0] } // Set table text color to black
    };

    // Add table to PDF document
    doc.autoTable({ head: [headers], body: data, ...tableStyles });

    // Add total amount row
    const totalRow = ['Total Amount Sum', '', '', '', '', '', '', totalAmount];
    doc.autoTable({ body: [totalRow], ...tableStyles });

    // Save the PDF file
    doc.save('booking_report.pdf');
  };

  return (
    <div style={{ padding: '100px' ,marginBottom:'10px'}}>
      <center>
        <table style={{ borderCollapse: 'collapse', width: '100%' }} ref={tableRef}>
          <thead>
            <tr>
              <th style={{ padding: '10px', border: '1px solid black' }}>ID</th>
              <th style={{ padding: '10px', border: '1px solid black' }}>Check-in Date</th>
              <th style={{ padding: '10px', border: '1px solid black' }}>Check-out Date</th>
              <th style={{ padding: '10px', border: '1px solid black' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid black' }}>Full Name</th>
              <th style={{ padding: '10px', border: '1px solid black' }}>Phone Number</th>
              <th style={{ padding: '10px', border: '1px solid black' }}>Room Type</th>
              <th style={{ padding: '10px', border: '1px solid black' }}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookingDetails.map((booking, index) => (
              <tr key={index + 1}>
                <td style={{ padding: '10px', border: '1px solid black', textAlign: 'center' }}>{index + 1}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{booking.checkInDate}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{booking.checkOutDate}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{booking.email}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{booking.fullName}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{booking.phoneNumber}</td>
                <td style={{ padding: '10px', border: '1px solid black' }}>{booking.roomType}</td>
                <td style={{ padding: '10px', border: '1px solid black', textAlign: 'center' }}>{booking.totalAmount}</td>
              </tr>
            ))}
            <tr>
              <td style={{ padding: '10px', border: '1px solid black' }} colSpan="7">
                <strong>Total Amount Sum:</strong>
              </td>
              <td style={{ padding: '10px', border: '1px solid black', textAlign: 'center' }}>
                {totalAmount}
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{padding:'20px'}}>
        <button  style={{backgroundColor:'#9df0f3'}} onClick={generatePDF}>Generate Report</button>
        </div>
      
      </center>
    </div>
  );
}
