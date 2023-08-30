import React from 'react';
import { CDBSidebar, CDBSidebarContent, CDBSidebarHeader, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Bookings from './Booking/Bookings';
import Profile from './UserModule/Profile';

function HomeScreen() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage or perform any logout logic
    localStorage.clear();
    // Navigate to the home screen
    navigate('/');
  };

  const userEmail = localStorage.getItem('userEmail');
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
        <Route path="/Profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default HomeScreen;
