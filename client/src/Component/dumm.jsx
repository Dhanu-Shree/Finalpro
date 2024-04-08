import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DividerWithCheckboxes from './DividerWithCheckboxes';
import './intern2.css';

function MainComponent() {
  const [courses, setCourses] = useState([]);
  const [assessmentDates, setAssessmentDates] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
    fetchAssessmentDates();
    fetchTrainings();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAssessmentDates = async () => {
    try {
      const response = await fetch('http://localhost:5000/assessment');
      const data = await response.json();
      const dates = data.map(item => new Date(item.dates));
      setAssessmentDates(dates);
    } catch (error) {
      console.error('Error fetching assessment dates:', error);
    }
  };

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/trainings');
      setTrainings(response.data);
    } catch (error) {
      console.error('Error fetching trainings:', error);
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

  const highlightAssessmentDates = ({ date }) => {
    if (loading) return false;
    const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return assessmentDates.some(assessmentDate => {
      const d = new Date(assessmentDate);
      return formattedDate.getDate() === d.getDate() && formattedDate.getMonth() === d.getMonth();
    });
  };

  const highlightTrainingDates = ({ date }) => {
    if (loading) return false;
    const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return trainings.some(training => {
      const trainingDate = new Date(training.trainingDate);
      return formattedDate.getDate() === trainingDate.getDate() && formattedDate.getMonth() === trainingDate.getMonth();
    });
  };

  return (
    <div className="app-container">
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-4'>
            <h1 className="page-heading">Calendars</h1>
            <div className="calendar-card">
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
                <h2>Calendar (Assessment Dates)</h2>
                <div className="react-calendar">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileClassName={({ date, view }) =>
                      view === 'month' && highlightAssessmentDates({ date }) ? 'highlight' : null
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-8'>
            <div className="display">
              <h1>Training Details</h1>
              <div className="training-card">
                <div className="training-list">
                  {trainings.map(training => (
                    <div className="training-CRUD" key={training._id}>
                      <h2>{training.trainingName}</h2>
                      <p><strong>Trainer:</strong> {training.trainerName}</p>
                      
                      <p><strong>Date:</strong> {new Date(training.trainingDate).toLocaleDateString()}</p>
                      <DividerWithCheckboxes modules={training.modules} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
