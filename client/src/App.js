// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Component/Login';
import CreateUser from './Component/Usercreate';
import AdminPage from './Component/Admin';
import TraineePage from './Component/Trainee';
import InternPage from './Component/Intern';
import CourseCard from './Component/Coursecard';
import Calendars from './Component/Calendar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/usercreate" element={<CreateUser />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/intern" element={<InternPage />} />
        <Route path="/trainee" element={<TraineePage />} />
        <Route path="/coursecard" element={<CourseCard />} />
        <Route path='/nextpage' element={<Calendars />}
 />      </Routes>
    </BrowserRouter>
  );
}

export default App;
