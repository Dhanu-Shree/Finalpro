// CourseCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Coursecard.css';
import NavBar from './Admin.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

function CourseCard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
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
      const response = await axios.post('http://localhost:5000/employeetraining', course); // Send POST request with Axios
      console.log(response.data); // Log response from backend
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/employeetraining');
      const data = await response.json();
      console.log("Fetched courses:", data);
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const highlightCourseDates = ({ date }) => {
    if (loading || !courses) return false;
    const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return courses.some(course => {
      const startDate = new Date(course.startDate);
      const endDate = new Date(course.endDate);
      return formattedDate >= startDate && formattedDate <= endDate;
    });
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
                <h2>Employee Training</h2>
                <div className="react-calendar">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileClassName={({ date, view }) =>
                      view === 'month' && highlightCourseDates({ date }) ? 'highlight' : null
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
