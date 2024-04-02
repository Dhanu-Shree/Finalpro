import React, { useState, useEffect } from 'react';
import './Calendar.css'; // Import your CSS file for styling
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css';

function Calendars() {
  const [assessmentDates, setAssessmentDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    // Fetch assessment dates from the backend
    fetchAssessmentDates();
  }, []);

  const fetchAssessmentDates = async () => {
    try {
      // Replace 'your-api-endpoint' with your actual API endpoint
      const response = await fetch('/assessment');
      const data = await response.json();
      setAssessmentDates(data);
    } catch (error) {
      console.error('Error fetching assessment dates:', error);
    }
  };

  const highlightDates = ({ date }) => {
    // Check if the current date is in the list of assessment dates
    return assessmentDates.some(assessmentDate => {
      const d = new Date(assessmentDate);
      return date.getDate() === d.getDate() &&
             date.getMonth() === d.getMonth() &&
             date.getFullYear() === d.getFullYear();
    });
  };

  return (
    <div className="App">
      <div className="card">
        <h2>Calendar</h2>
        <div className="calendar-container">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date, view }) =>
              view === 'month' && highlightDates({ date }) ? 'highlight' : null
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Calendars;
