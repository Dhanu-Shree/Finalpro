import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InternNavBar from './Navforintern.jsx';
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
      const sortedCourses = response.data.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      setCourses(sortedCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchAssessments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/assessment');
      const sortedAssessments = response.data.sort((a, b) => new Date(a.dates) - new Date(b.dates));
      setAssessments(sortedAssessments);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  const isPastDate = (date) => {
    return new Date(date) < new Date();
  };

  const renderCourseName = (course) => {
    if (isPastDate(course.startDate)) {
      return <del>{course.Training}</del>;
    }
    return course.Training;
  };

  const renderAssessmentName = (assessment) => {
    if (isPastDate(assessment.dates)) {
      return <del>{assessment.assessmentName}</del>;
    }
    return assessment.assessmentName;
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
                <div key={course._id} className={`course-item ${isPastDate(course.endDate) ? 'complete' : ''}`}>
                  <h5 className="cerd-title">
                    {renderCourseName(course)}
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
                <div key={assessment._id} className={`assessment-item ${isPastDate(assessment.dates) ? 'complete' : ''}`}>
                  <h5 className="cerd-title">
                    {renderAssessmentName(assessment)}
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
