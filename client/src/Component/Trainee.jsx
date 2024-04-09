import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './intern2.css';
import TraineeNavbar from './Navfortrainee';
import './Coursecard.css'; // Import CSS for CourseCard styling

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
      <TraineeNavbar/>
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-12'>
            <h1 className="page-heading">Calendars</h1>
            <div className="scrollable-cards" style={{overflowX: 'auto', whiteSpace: 'nowrap'}}>
              {/* Course Calendar Card */}
              <div className="card" style={{display: 'inline-block', marginRight: '10px'}}>
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
              {/* Assessment Dates Calendar Card */}
              <div className="card" style={{display: 'inline-block', marginRight: '10px'}}>
                <div className="card-body">
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
              {/* Training Dates Calendar Card */}
              <div className="card" style={{display: 'inline-block'}}>
                <div className="card-body">
                  <h2>Calendar (Training Dates)</h2>
                  <div className="react-calendar">
                    <Calendar
                      onChange={setSelectedDate}
                      value={selectedDate}
                      tileClassName={({ date, view }) =>
                        view === 'month' && highlightTrainingDates({ date }) ? 'highlight' : null
                      }
                    />
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

export default MainComponent;
