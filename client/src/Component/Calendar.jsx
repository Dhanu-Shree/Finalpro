import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

function Calendars() {
  const [assessmentDates, setAssessmentDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch assessment dates from the backend
    fetchAssessmentDates();
  }, []);

  const fetchAssessmentDates = async () => {
    try {
      const response = await fetch('http://localhost:5000/assessment');
      const data = await response.json();
      console.log("Fetched dates:", data);

      // Assuming 'dates' field contains an array of date strings
      const dates = data.map(item => new Date(item.dates));
      
      console.log("Parsed dates:", dates);
      setAssessmentDates(dates);
    } catch (error) {
      console.error('Error fetching assessment dates:', error);
    } finally {
      setLoading(false);
    }
  };

  const highlightDates = ({ date }) => {
    if (loading) return false;
    const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const isHighlighted = assessmentDates.some(assessmentDate => {
      const d = new Date(assessmentDate);
      const isMatching = formattedDate.getDate() === d.getDate() && formattedDate.getMonth()===d.getMonth();
      if (isMatching) {
        console.log("Highlighted Date:", formattedDate); // Log the highlighted date
      }
      return isMatching;
    });
    return isHighlighted;
  };

  

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-6 grid-item">
          <div className="card">
            <div className="card-body">
              <h2>Calendar</h2>
              <div className="react-calendar">
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
          <div className='card'>
          <div className="card-body">
              <h2>Calendar</h2>
              <div className="react-calendar">
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
