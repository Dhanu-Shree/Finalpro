import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import './admin2.css';
import NavBar from './Admin.js';

function MainComponent() {
  const [courses, setCourses] = useState([]);
  const [assessmentDates, setAssessmentDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [trainerName, setTrainerName] = useState('');
  const [trainerEmail, setTrainerEmail] = useState('');
  const [trainingName, setTrainingName] = useState('');
  const [trainingstartDate, setTrainingstartDate] = useState('');
  const [trainingendDate, setTrainingendDate] = useState('');
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchCourses();
    fetchAssessmentDates();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
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

  const handleModuleChange = (index, event) => {
    const newModules = [...modules];
    newModules[index] = event.target.value;
    setModules(newModules);
  };

  const handleAddModule = () => {
    setModules([...modules, '']);                    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted'); // Check if this log is printed
    try {
      const formData = {
        trainerName,
        trainerEmail,
        trainingName,
        trainingstartDate,
        trainingendDate,
        modules
      };
      console.log('Form data to be sent:', formData); // Log form data before sending

      const response = await axios.post('http://localhost:5000/trainings', formData);
      console.log('Form data sent successfully:', response.data);
      setTrainerName('');
      setTrainerEmail('');
      setTrainingName('');
      setTrainingstartDate('');
      setTrainingendDate('');
      setModules([]);
      fetchTrainings(); // Fetch trainings after successful submission
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/trainings');
      setTrainings(response.data);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };

  return (
    <div className="app-container">
      <NavBar />
      <div className="container-fluid">
        <div className='row'>
          <div className='col-md-4'>
            <h1 className="page-heading"></h1>
            <div className="calendar-card">
              <div className="card-body">
                <div className='cal1'>
                  <h2>Intern Training</h2>
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
            <h1 className="page-heading"><h3></h3></h1>
            <div className="form-card">
              <div className="card-body">
                <form className='dum' onSubmit={handleSubmit}>
                  <label>
                    Trainer Name:
                    <input type="text" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
                  </label>
                  <br />
                  <label>
                    Trainer Email:
                    <input type="email" value={trainerEmail} onChange={(e) => setTrainerEmail(e.target.value)} />
                  </label>
                  <br />
                  <label>
                    Training Name:
                    <input type="text" value={trainingName} onChange={(e) => setTrainingName(e.target.value)} />
                  </label>
                  <br />
                  <label>
                    StartDate:
                    <input type="date" value={trainingstartDate} onChange={(e) => setTrainingstartDate(e.target.value)} />
                  </label>
                  <label>
                    End Date:
                    <input type="date" value={trainingendDate} onChange={(e) => setTrainingendDate(e.target.value)} />
                  </label>
                  <br />
                  <label>
                    Modules:
                    <br/><br/>
                    {modules.map((module, index) => (
                      <input
                        key={index}
                        type="text"
                        value={module}
                        onChange={(e) => handleModuleChange(index, e)}
                      />
                    ))}
                    <button type="button" onClick={handleAddModule}>Add Module</button>
                  </label>
                  <br />
                  <button type="submit">Assign Training</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainComponent;
