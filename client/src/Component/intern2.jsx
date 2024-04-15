import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DividerWithCheckboxes from './DividerWithCheckboxes';
import './intern2.css';
import InternNavBar from './Navforintern.jsx';

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
      const sortedTrainings = response.data.sort((a, b) => new Date(a.trainingstartDate) - new Date(b.trainingstartDate));
      setTrainings(sortedTrainings);
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

  const isWithinOneWeek = (startDate) => {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const difference = new Date(startDate) - new Date(); // Calculate difference with current date
    return difference <= oneWeekInMilliseconds && difference >= 0; // Check if the difference is within one week and positive
  };

  return (
    <div className="app-container">
      <InternNavBar />
      <br></br>
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-4'>
            <div className="calendar-card">
              <div className="card-body">
                <h2>Training Dates </h2>
                <div className="react-calendar">
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    tileClassName={({ date, view }) =>
                      view === 'month' && highlightCourseDates({ date }) ? 'highlight' : null
                    }
                  />
                </div>
                <h2>Assessment Dates</h2>
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
            <br></br>
            <div className="display">
              <div className="training-card">
                <div className="training-list">
                  {trainings.map(training => (
                    <div className="training-CRUD" key={training._id}>
                      <h2 className={new Date(training.trainingendDate) < new Date() ? 'strikethrough' : ''}>
                        {training.trainingName}
                      </h2>
                      <p><strong>Trainer:</strong> {training.trainerName}</p>
                      <p><strong>Start Date:</strong> {new Date(training.trainingstartDate).toLocaleDateString()}</p>
                      <p><strong>End Date:</strong> {new Date(training.trainingendDate).toLocaleDateString()}</p>
                      <DividerWithCheckboxes modules={training.modules}   trainingName={training.trainingName} />
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
