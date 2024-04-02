import React from 'react';
import { Link } from 'react-router-dom';
import './Intern.css'; // Import CSS file for styling

const Intern = () => {
  return (
    <div className="intern-dashboard">
      {/* Navigation bar */}
      <nav className="navbar">
        <div className="user-info">
          {/* Display user's login name */}
          <span className="login-name">John Doe</span>
          {/* Profile icon */}
          <Link to="/profile">
            <img src="profile-icon.png" alt="Profile" className="profile-icon" />
          </Link>
          {/* Display user's role */}
          <span className="role">Intern</span>
        </div>
      </nav>
      <div className='row'>
      {/* Main content */}
      <div className="main-content">
        {/* First row */}
        <div className="row">
          <div className="col-md-6">
            {/* Upcoming Training Plans */}
            <div className="section">
              <h2>Upcoming Training Plans</h2>
              <p>No upcoming training plans.</p>
            </div>
          </div>
          <div className="col-md-6">
            {/* Progress */}
            <div className="section">
              <h2>Training Progress</h2>
              <p>No training progress available.</p>
            </div>
          </div>
        </div></div>

        {/* Second row */}
        <div className="row">
          <div className="col-md-6">
            {/* Assessment Results */}
            <div className="section">
              <h2>Assessment Results</h2>
              <p>No assessment results available.</p>
            </div>
          </div>
          <div className="col-md-6">
            {/* Training Materials */}
            <div className="section">
              <h2>Training Materials</h2>
              <p>No training materials available.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intern;
