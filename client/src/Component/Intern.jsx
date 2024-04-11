import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternNavBar from './Navforintern.jsx';
import { MdNotifications } from 'react-icons/md'; // Import icon from react-icons library
import './Intern.css';

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

  // Function to check if the difference between two dates is within one week
 // Function to check if the difference between start date and current date is within one week
const isWithinOneWeek = (startDate) => {
    const oneWeekInMilliseconds = 7 * 24 * 60 * 60 * 1000;
    const difference = new Date(startDate) - new Date(); // Calculate difference with current date
    return difference <= oneWeekInMilliseconds && difference >= 0; // Check if the difference is within one week and positive
  };
  

  return (
    <div className="app-container">
      <InternNavBar />
      <div className="outer-cerds">
        <div className="inner-cerds">
          <div className="cerd">
            <h2 className="cerd-titles">Courses</h2>
            <div className="cerd-body scrollable-content">
              {courses.map((course) => (
                <div key={course._id} className="course-item">
                  <h5 className="cerd-title">
                    {course.Training}<br></br>
                    {isWithinOneWeek(course.startDate, course.endDate) && (
                      <MdNotifications className="notification-icon" /> // Render the icon if within one week
                    )}
                  </h5>
                  <p>Trainer: {course.Trainer}</p>
                  <p>
                    Study Material: <a href={course.studymaterial}>{course.studymaterial}</a>
                  </p>
                  <p>Start Date: {new Date(course.startDate).toLocaleDateString()}</p>
                  <p>End Date: {new Date(course.endDate).toLocaleDateString()}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="cerd">
  <h2 className="cerd-titles">Assessments</h2>
  <div className="cerd-body scrollable-content">
    {assessments.map((assessment) => (
      <div key={assessment._id} className="assessment-item">
        <h5 className="cerd-title">
          {assessment.assessmentName}
          {isWithinOneWeek(assessment.dates) && (
            <MdNotifications className="notification-icon" /> // Render the icon if assessment date is within one week
          )}
        </h5>
        <p>Links: <a href={assessment.links}></a></p>
        <p>Start Time: {assessment.startTime}</p>
        <p>End Time: {assessment.endTime}</p>
        <p>Date of Assessment: {new Date(assessment.dates).toLocaleDateString()}</p>
      </div>
    ))}
  </div>
</div>

        </div>
      </div>
    </div>
  );
}

export default Intern;
