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
            <input type="date" className="form-control" id="startTime" name="startTime" value={assess.startTime} onChange={handleChanges} />
          </div>
          <div className="mb-3">
            <label htmlFor="endTime" className="form-label">End Time</label>
            <input type="date" className="form-control" id="endTime" name="endTime" value={assess.endTime} onChange={handleChanges} />
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
