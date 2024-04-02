// CourseCard.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './Coursecard.css'; 
import NavBar from './Admin.js'// Import the CSS file for styling

function CourseCard() {
  const [assess, setAssessment] = useState({
    assessmentName: '',
    link: '',
    startTime: '',
    endTime: '',
    duration:''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssessment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/courses', assess); // Send POST request with Axios
      console.log(response.data); // Log response from backend
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container">
    <NavBar />
    <div className="container-fluid">
    <div className='row'>
      <div className='col-6 grid-item'>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add Course</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="assessmentName" className="form-label">Course Name</label>
            <input type="text" className="form-control" id="assessmentName" name="assessmentName" value={assess.assessmentName} onChange={handleChange} />
          </div>
          
          <div className="mb-3">
            <label htmlFor="link" className="form-label">Course Link</label>
            <input type="text" className="form-control" id="link" name="link" value={assess.link} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="startTime" className="form-label">Start Date</label>
            <input type="date" className="form-control" id="startTime" name="startTime" value={assess.startTime} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="endTime" className="form-label">End Date</label>
            <input type="date" className="form-control" id="endTime" name="endTime" value={assess.endTime} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Assessment</button>
        </form>
      </div>
    </div>
    </div>
   