import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
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
      const response = await fetch('/assessment'); // Adjust the API endpoint as needed
      const data = await response.json();
      setAssessmentDates(data);
    } catch (error) {
      console.error('Error fetching assessment dates:', error);
    }
  };

  const highlightDates = ({ date }) => {
    const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return assessmentDates.some((assessmentDate) => {
      const d = new Date(assessmentDate);
      return formattedDate.getTime() === d.getTime();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 grid-item">
          <div className="card">
            <div className="card-body">
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
        </div>
        {/* Other components */}
      </div>
    </div>
  );
}

export default Calendars;
