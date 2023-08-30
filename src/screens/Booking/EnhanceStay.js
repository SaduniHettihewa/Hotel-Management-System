import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button } from 'react-bootstrap';
import board from '../../assets/Rooms/board.jpg';
import djNight from '../../assets/Rooms/djnight.jpg';
import game from '../../assets/Rooms/game.jpg';
import pool from '../../assets/Rooms/pool.jpg';



export default function EnhanceStay({ roomId, roomType, roomPrice , onServiceSelect}) {
    const [selectedServiceID, setSelectedServiceID] = useState(null);
    const [selectedServiceTitle, setSelectedServiceTitle] = useState(null);
    const [selectedServicePrice, setSelectedServicePrice] = useState(0);

 console.log(roomId, roomType, roomPrice)

  const services = [
    {
      id: 1,
      title: 'Board Ride',
      description: 'Amazing Board Ride for one hour',
      image: board,
      price: 1000
    },
    {
      id: 2,
      title: 'DJ Night',
      description: 'Enjoy with full DJ Night',
      image: djNight,
      price: 500
    },
    {
      id: 3,
      title: 'Gaming Zone',
      description: 'Unlimitaed gaming access for two hours.',
      image: game,
      price: 1000
    },
    {
      id: 4,
      title: 'Pool Access',
      description: 'Two hour pool access',
      image: pool,
      price: 500
    }
  ];

 

  const handleSelectClick = (ServiceID ,ServiceTitle ,ServicePrice) => {
    setSelectedServiceID(ServiceID);
    setSelectedServiceTitle(ServiceTitle);
    setSelectedServicePrice(ServicePrice);
    onServiceSelect(ServiceID, ServiceTitle, ServicePrice); 
   console.log(ServiceID, ServiceTitle, ServicePrice)
  };

  
  return (
    <div className="rooms-container">
      <h2>Enhance Your Stay</h2>
      <div className="rooms-list d-flex flex-wrap">
        {services.map(service => (
          <Card key={service.id} className="room-card" >
            <div className="room-image">
              <Card.Img variant="top" src={service.image} alt={service.title} style={{ width: '350px', height: '200px' }} />
            </div>
            <Card.Body>
              <Card.Title id='roomtypeElement'>{service.title}</Card.Title>
              <Card.Text>{service.description}</Card.Text>
              <h4 className="text-primary font-weight-bold" id='priceElement'>Rs.{service.price} </h4>
              <Button
                variant={selectedServiceID === service.id ? 'success' : 'primary'}
                onClick={() => handleSelectClick(service.id, service.title, service.price, )}
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
