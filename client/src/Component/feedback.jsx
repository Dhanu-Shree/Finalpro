import React, { useState } from 'react';
import axios from 'axios';
import './feedback.css'; // Import CSS file for FeedbackForm styling

function FeedbackForm({ trainerName, userId, userName }) {
  const [overallRating, setOverallRating] = useState('');
  const [contentCoverageRating, setContentCoverageRating] = useState('');
  const [interactionRating, setInteractionRating] = useState('');
  const [organizationRating, setOrganizationRating] = useState('');
  const [usefulnessRating, setUsefulnessRating] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        trainerName,
        userId,
        userName,
        overallRating,
        contentCoverageRating,
        interactionRating,
        organizationRating,
        usefulnessRating,
        feedbackMessage
      };
      const response = await axios.post('http://localhost:5000/feedback', formData);
      console.log('Feedback submitted successfully:', response.data);
      // Optionally, you can show a success message or redirect the user to a different page
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Optionally, you can show an error message to the user
    }
  };

  return (
    <div className="cardd">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit} className="scrollable-form">
        <div className="form-group">
          <label htmlFor="overallRating">Overall Training Rating:</label>
          <select
            value={overallRating}
            onChange={(e) => setOverallRating(e.target.value)}
            className="form-control"
          >
            <option value="">Select rating...</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
        </div>
        {/* Repeat similar code for other rating fields */}
        <div className="form-group">
          <label htmlFor="feedbackMessage">Feedback Message:</label>
          <textarea
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
