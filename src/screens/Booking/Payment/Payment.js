import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export default function Payment({ roomId, roomType, roomPrice, ServiceID, serviceTitle, servicePrice, setReservation}) {
  const handleContinueClick = () => {
    console.log('Continue button clicked');
    setReservation(roomType, roomPrice, roomId, servicePrice,formattedCheckInDate,formattedCheckOutDate,PersonsCount);
  };

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);

  const checkInDate = queryParams.get('startDate');
  const checkOutDate = queryParams.get('endDate');
  const PersonsCount = queryParams.get('numberOfPersons');

  const formattedCheckInDate = useMemo(() => {
    return new Date(checkInDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }, [checkInDate]);

  const formattedCheckOutDate = useMemo(() => {
    return new Date(checkOutDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  }, [checkOutDate]);

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>Reservation Summary</Card.Title>
          <Card.Text style={{ height: '500px', marginTop: '10px', marginBottom: '20px', width: '160px' }}>
            <div>
              <strong>Check-in Date:</strong> <p style={{ color: '#3b82f6' }}>{formattedCheckInDate}</p>
            </div>
            <div>
              <strong>Check-out Date:</strong> <p style={{ color: '#3b82f6' }}>{formattedCheckOutDate}</p>
            </div>
            <div>
              <strong>Persons Count:</strong> <p style={{ color: '#3b82f6' }}>{PersonsCount}</p>
            </div>

            <div>
              <strong>Room Type:</strong> <p style={{ color: '#3b82f6' }}>{roomType}</p>
            </div>
            <div>
              <strong>Room Price:</strong> <p style={{ color: '#3b82f6' }}>Rs.{roomPrice}</p>
            </div>
            <div>
              <strong>Service Title:</strong> <p style={{ color: '#3b82f6' }}>{serviceTitle}</p>
            </div>
            <div>
              <strong>Service Price:</strong> <p style={{ color: '#3b82f6' }}>Rs.{servicePrice}</p>
            </div>
            <div>
              <strong>Payment Total:</strong>
              <p style={{ color: '#3b82f6' }}>Rs.{roomPrice + servicePrice}</p>
            </div>
          </Card.Text>
          <Button variant="primary" onClick={handleContinueClick}>
            Confirm booking
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
