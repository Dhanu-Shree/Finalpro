// CourseCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Coursecard.css';
import NavBar from './Navforemp.jsx';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import './Employee.css';
import { MdNotifications } from 'react-icons/md';


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
  const [trainings, setTrainings] = useState([]);
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
  const isWithinOneWeek = (startDate) => {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const difference = new Date(startDate) - new Date(); // Calculate difference with current date
    return difference <= oneWeekInMilliseconds && difference >= 0; // Check if the difference is within one week and positive
  };
 
  return (
    <div className="app-container">
    <NavBar />
    <div className="container-fluid">
      <div className='row'>
        <div className='col-md-6 grid-item'>
          <div className="card">
            <div className="card-body">
              <h1>Training Details</h1>
              <div className="training-card-css">
                <div className="training-list">
                  {courses.map(training => (
                    
                    <div className="training-CRUD" key={training._id}>
                      <h2>{training.Training}</h2>
                      {isWithinOneWeek(training.startDate, training.endDate) && (
                      <MdNotifications className="notification-icon" /> // Render the icon if within one week
                    )}
                      
                      <p><strong>Trainer:</strong> {training.Trainer}</p>
                      <p><strong>Study Material:</strong> <a href={training.studymaterial}>{training.studymaterial}</a></p>
                      
                     

                      <p><strong>Start Date :</strong>{new Date(training.startDate).toLocaleDateString()}</p>
                      <p><strong>End Date :</strong> {new Date(training.endDate).toLocaleDateString()}</p>
                      {/* Add additional details as needed */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6 grid-item'>
          <div className="card">
            <div className="card-body">
              <h2>Calendar (Courses)</h2>
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