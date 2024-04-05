import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DividerWithCheckboxes from './DividerWithCheckboxes'; // Import the DividerWithCheckboxes component
import './Display.css';

function Display() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/trainings'); // Replace 'YOUR_BACKEND_ENDPOINT' with your backend URL
      setTrainings(response.data);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };

  return (
    <div className="display">
      <h1>Training Details</h1>
      <div className="training-card">
        <div className="training-list">
          {trainings.map(training => (
            <div className="training-CRUD" key={training._id}>
              <h2>{training.trainingName}</h2>
              <p><strong>Trainer:</strong> {training.trainerName}</p>
              <p><strong>Email:</strong> {training.trainerEmail}</p>
              <p><strong>Date:</strong> {new Date(training.trainingDate).toLocaleDateString()}</p>
              <DividerWithCheckboxes modules={training.modules} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Display;
