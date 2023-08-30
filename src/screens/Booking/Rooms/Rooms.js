import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import singleRoomImage from '../../../assets/Rooms/single.jpg';
import DeluxRoom from '../../../assets/Rooms/deluxe.jpg';
import DoubleRoom from '../../../assets/Rooms/double.jpg';
import FamilyRoom from '../../../assets/Rooms/family.jpg';



export default function Rooms({onRoomSelect}) {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [selectedRoomType, setSelectedRoomType] = useState(null);
  const [selectedRoomPrice, setSelectedRoomPrice] = useState(0);



  const rooms = [
    {
      id: 1,
      title: 'Single Room',
      description: 'A cozy room with a single bed',
      image: singleRoomImage,
      price: 5000
    },
    {
      id: 2,
      title: 'Double Room',
      description: 'A spacious room with a double bed',
      image: DoubleRoom,
      price: 8000
    },
    {
      id: 3,
      title: 'Deluxe Room',
      description: 'A luxurious room with a king-size bed',
      image: DeluxRoom,
      price: 10000
    },
    {
      id: 4,
      title: 'Family Room',
      description: 'A large room suitable for families',
      image: FamilyRoom,
      price: 15000
    }
  ];

  const handleCardClick = (id) => {
    console.log('Clicked card with id:', id);
  };

  const handleSelectClick = (id, price, type) => {
    console.log('Clicked select button for room with id:', id, type);
    setSelectedRoomId(id);
    setSelectedRoomPrice(price);
    setSelectedRoomType(type)
    onRoomSelect(id, type, price);
  };

  
  return (
    <div className="rooms-container">
      <h2>Select Room</h2>
      <div className="rooms-list d-flex flex-wrap">
        {rooms.map(room => (
          <Card key={room.id} className="room-card" onClick={() => handleCardClick(room.id)}>
            <div className="room-image">
              <Card.Img variant="top" src={room.image} alt={room.title} style={{ width: '350px', height: '200px' }} />
            </div>
            <Card.Body>
              <Card.Title id='roomtypeElement'>{room.title}</Card.Title>
              <Card.Text>{room.description}</Card.Text>
              <h4 className="text-primary font-weight-bold" id='priceElement'>Rs.{room.price} / Per night</h4>
              <Button
                variant={selectedRoomId === room.id ? 'success' : 'primary'}
                onClick={() => handleSelectClick(room.id, room.price, room.title)}
              >
                Select
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
