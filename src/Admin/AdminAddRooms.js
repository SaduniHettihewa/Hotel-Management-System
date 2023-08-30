import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminAddRoom.css';

export default function AdminAddRooms() {
  const [rooms, setRooms] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    roomNo: '',
    roomType: '',
    roomCount: '',
    roomPrice: ''
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/room/all');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/room/create', formData);
      fetchRooms();
      closePopup();
    } catch (error) {
      console.error('Error creating room:', error);
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setFormData({
      roomNo: '',
      roomType: '',
      roomCount: '',
      roomPrice: ''
    });
  };

  const handleDeleteRoom = async (roomNo) => {
    try {
      await axios.delete(`http://localhost:8080/room/delete/${roomNo}`);
      fetchRooms();
    } catch (error) {
      console.error('Error deleting room:', error);
    }
  };

  return (
    <div>
      <div style={{ padding: '20px' }}>
        <h2>Add Rooms</h2>
      </div>
      <div style={{ padding: '20px' }}>
        <button
          style={{ backgroundColor: '#9df0f3', padding: '5px' }}
          onClick={openPopup}
        >
          Create Room
        </button>
      </div>

      {isPopupOpen && (
        <div className="popup">
        <div className="popup-content" style={{ padding: '10px' }}>
          <form onSubmit={handleFormSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label>ID:</label>
                <input
                  type="text"
                  name="roomNo"
                  value={formData.roomNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
      
              <div className="form-field" style={{ paddingRight: '10px' }}>
                <label>Room Type:</label>
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                  required
                >
                  
                  <option value="">Select Room Type</option>
                  <option value="Single">Single</option>
                  <option value="Deluxe Double">Deluxe Double</option>
                  <option value="Family">Family</option>
                </select>
              </div>
      
              <div className="form-field" style={{ paddingRight: '10px' }} >
                <label>Rooms Count:</label>
                <input
                  type="number"
                  name="roomCount"
                  value={formData.roomCount}
                  onChange={handleInputChange}
                  required
                />
              </div>
      
              <div className="form-field">
                <label>Room Price:</label>
                <input
                  type="number"
                  name="roomPrice"
                  value={formData.roomPrice}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
      
            <div className="form-actions" style={{ padding: '10px' }}>
              <button type="submit" style={{ backgroundColor: '#9df0f3', padding: '5px' }}>
                Create
              </button>
              <button type="button" style={{ backgroundColor: '#7be495', padding: '5px' }} onClick={closePopup}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      )}
      <div style={{ padding: '20px' }}>
        <table className="room-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Type</th>
              <th>Rooms Count</th>
              <th>Room Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.roomNo}</td>
                <td>{room.roomType}</td>
                <td>{room.roomCount}</td>
                <td>Rs.{room.roomPrice}</td>
                <td>
                  <button style={{ backgroundColor: 'red' }} onClick={() => handleDeleteRoom(room.roomNo)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
