import React from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import AdminAddRooms from './AdminAddRooms';
import AdminBooking from './AdminBooking';
import Bookings from '../screens/Booking/Bookings';
import Profile from '../screens/UserModule/Profile';

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage or perform any logout logic
    localStorage.removeItem('user');
    navigate('/');
    // Navigate to the home screen
    
  };

  const isAdmin = localStorage.getItem('user') === 'admin';

  if (isAdmin) {
    return (
      <div style={{ display: 'flex', height: '200vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#edf2f5" backgroundColor="rgb(33, 205, 218)">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              Suhadha Villa-Admin
            </a>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/admin-dashboard/viewBookings" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">Booking Details</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/admin-dashboard/roomAdd" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="book">Room Details</CDBSidebarMenuItem>
              </NavLink>
              <CDBSidebarMenuItem icon="sign-out" onClick={handleLogout}>
                Logout
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
        <Routes>
          <Route path="/admin-dashboard/viewBookings" element={<AdminBooking />} />
          <Route path="/admin-dashboard/roomAdd" element={<AdminAddRooms />} />
        </Routes>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', height: '200vh', overflow: 'scroll initial' }}>
        <CDBSidebar textColor="#edf2f5" backgroundColor="rgb(33, 205, 218)">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
              Suhadha Villa
            </a>
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <NavLink exact to="/booking" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="columns">Booking</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/Profile" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="book">Profile</CDBSidebarMenuItem>
              </NavLink>
              <NavLink exact to="/" activeClassName="activeClicked">
                <CDBSidebarMenuItem icon="table">Item</CDBSidebarMenuItem>
              </NavLink>
              <CDBSidebarMenu>
                <CDBSidebarMenuItem icon="sign-out" onClick={handleLogout}>
                  Logout
                </CDBSidebarMenuItem>
              </CDBSidebarMenu>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
        <Routes>
          <Route path="/booking" element={<Bookings />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    );
  }
}

export default AdminDashboard;
