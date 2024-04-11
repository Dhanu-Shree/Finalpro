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
import Progress from './Component/progress';
import Module from './Component/module';
import Display from './Component/intern2';
import Newuser from './Component/newuser';
import Calendar2 from './Component/Calendar2';
import Admin2 from './Component/admin2';
import Admin3 from './Component/thirdadmin'
import Employee from './Component/Employee'
import Progressuser from './Component/progressforuser';
import Progresstraining from './Component/dumi';
import ProgressforTrainee from './Component/progresstrainee';
import Feedback from './Component/feedback';


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
        <Route path='/nextpage' element={<Calendars />}/>
        {/* <Route path='/popup' element={<Popup />}/> */}
        <Route path='/module' element={<Module/>}/>
        <Route path='/intern2' element={<Display/>}/>
        <Route path='newuser' element={<Newuser />}/>
        <Route path='calendar2' element={<Calendar2 />}/>
        <Route path='admin2' element ={<Admin2 />}/>
        <Route path='progress' element={<Progress/>}/>
        <Route path='thirdadmin' element ={<Admin3/>}/>
        <Route path='employee' element={<Employee />}/>
        <Route path='admin4' element={<Progressuser/>}/>
        <Route path='pintern' element={<Progresstraining/>}/>
        <Route path='traineeprogress' element={<ProgressforTrainee/>}/>
        <Route path='feedback' element ={<Feedback/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
