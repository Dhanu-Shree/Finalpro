// CourseCard.js
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './Coursecard.css'; 
import NavBar from './Admin.js'// Import the CSS file for styling

function CourseCard() {
  const [course, setCourse] = useState({
    Training: '',
    Trainer: '',
    studymaterial: '',
    startDate: '',
    endDate: ''
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/courses', course); // Send POST request with Axios
      console.log(response.data); // Log response from backend
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //For Assessment card
  const [assess, setAssessment] = useState({
    assessmentName: '',
    links: '',
    startTime: '',
    endTime: '',
    dates:''
  });
  

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setAssessment(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmits = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/assessment', assess); // Send POST request with Axios
      console.log(response.data); // Log response from backend
      console.log(response)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="app-container">
    <NavBar />
    <div className="container-fluid">
    <div className='row'>
      <div className='col-md-6 grid-item'>
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add Training</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="Training" className="form-label">Training Name</label>
            <input type="text" className="form-control" id="Training" name="Training" value={course.Training} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="Trainer" className="form-label">Trainer</label>
            <textarea className="form-control" id="Trainer" name="Trainer" value={course.Trainer} onChange={handleChange}></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="studymaterial" className="form-label">Materials</label>
            <input type="text" className="form-control" id="studymaterial" name="studymaterial" value={course.studymaterial} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input type="date" className="form-control" id="startDate" name="startDate" value={course.startDate} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input type="date" className="form-control" id="endDate" name="endDate" value={course.endDate} onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-primary">Add Training</button>
        </form>
      </div>
    </div>
    </div>
    <div className='col-md-6 grid-item'>
    <div className="card">
      <div className="card-body">
      <h5 className="card-title">Assessment</h5>
        <form onSubmit={handleSubmits}>
          <div className="mb-3">
            <label htmlFor="assessmentName" className="form-label">Assessment Name</label>
            <input type="text" className="form-control" id="assessmentName" name="assessmentName" value={assess.assessmentName} onChange={handleChanges} />
          </div>
          
          <div className="mb-3">
            <label htmlFor="links" className="form-label">Link</label>
            <input type="text" className="form-control" id="links" name="links" value={assess.links} onChange={handleChanges} />
          </div>
          <div className="mb-3">
            <label htmlFor="startTime" className="form-label">Start Time</label>
            <input type="time" className="form-control" id="startTime" name="startTime" value={assess.startTime} onChange={handleChanges} />
          </div>
          <div className="mb-3">
            <label htmlFor="endTime" className="form-label">End Time</label>
            <input type="time" className="form-control" id="endTime" name="endTime" value={assess.endTime} onChange={handleChanges} />
          </div>
          <div className="mb-3">
            <label htmlFor="dates" className="form-label">Date of Assessment</label>
            <input type="date" className="form-control" id="dates" name="dates" value={assess.dates} onChange={handleChanges} />
          </div>
          <button type="submit" className="btn btn-primary">Add Assessment</button>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
    </div>
  );
}

export default CourseCard;
