import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import NavBar from 'Internavbar.jsx'; 
import './Coursecard.css'; 
import InternNavBar from './Navforintern.jsx';


function Intern() {
  const [courses, setCourses] = useState([]);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchAssessments();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAssessments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/assessment');
      setAssessments(response.data);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  return (
    <div className="app-container">
      <InternNavBar />
      <div className="container-fluid">
        <div className="row">
       
          <div className="col-md-6">
          <div style={{ width: '300px', height: '200px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ padding: '10px' }}>
    
        
                <h2>Courses</h2>
                {courses.map((course) => (
                  <div key={course._id} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{course.Training}</h5>
                      <p className="card-text">Trainer: {course.Trainer}</p>
                      <p className="card-text">Study Material: {course.studymaterial}</p>
                      <p className="card-text">Start Date: {new Date(course.startDate).toLocaleDateString()}</p>
                      <p className="card-text">End Date: {new Date(course.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              
            
          </div>
          </div>
          
          <div className="col-md-6">
          <div style={{ width: '300px', height: '200px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <div style={{ padding: '10px' }}>
            <div className="card">
        
                <h2>Assessments</h2>
                {assessments.map((assessment) => (
                  <div key={assessment._id} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">{assessment.assessmentName}</h5>
                      <p className="card-text">Links: {assessment.links}</p>
                      <p className="card-text">Start Time: {new Date(assessment.startTime).toLocaleString()}</p>
                      <p className="card-text">End Time: {new Date(assessment.endTime).toLocaleString()}</p>
                      <p className="card-text">Date of Assessment: {new Date(assessment.dates).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              
            </div>
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Intern;
