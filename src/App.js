import React from 'react';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import WelcomePage from './screens/welcome/welcomeScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@stripe/stripe-js";
import AdminDashboard from './Admin/AdminDashboard';

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
      </Routes>
      <AdminDashboard/>
    </BrowserRouter>
  );
}

export default App;
