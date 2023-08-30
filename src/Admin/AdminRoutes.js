import React from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import WelcomePage from './screens/welcome/welcomeScreen';
import HomeScreen from './screens/HomeScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@stripe/stripe-js";
import AdminDashboard from './Admin/AdminDashboard';

export default function AdminRoutes() {
  return (
    <BrowserRouter>
   
    <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
   
   
  </BrowserRouter>
  )
}
