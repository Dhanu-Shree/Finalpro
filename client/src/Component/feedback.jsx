import React, { useState } from 'react';
import axios from 'axios';
import './feedback.css'; // Import CSS file for FeedbackForm styling

function FeedbackForm() {
  const [trainerId, setTrainerId] = useState('');
  const [trainerName, setTrainerName] = useState('');
  const [overallRating, setOverallRating] = useState('');
  const [contentCoverageRating, setContentCoverageRating] = useState('');
  const [interactionRating, setInteractionRating] = useState('');
  const [organizationRating, setOrganizationRating] = useState('');
  const [usefulnessRating, setUsefulnessRating] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = {
        trainerId,
        userId,
        userName,
        trainerName,
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

        <label htmlFor="trainerId">Trainer's Id:</label>
          <input
            type="text"
            id="trainerId"
            value={trainerId}
            onChange={(e) => setTrainerId(e.target.value)}
            className="form-control"
            placeholder="Enter trainer's name..."
            required
          />
          <label htmlFor="trainerName">Trainer's Name:</label>
          <input
            type="text"
            id="trainerName"
            value={trainerName}
            onChange={(e) => setTrainerName(e.target.value)}
            className="form-control"
            placeholder="Enter trainer's name..."
            required
          />
          
        </div>
        <div className="form-group">
          {/* Rating select inputs */}
        </div>
        <div className="form-group">
          <label htmlFor="feedbackMessage">Feedback Message:</label>
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

          <label htmlFor="contentCoverageRating">Satisfaction with Content Coverage:</label>
          <select
            value={contentCoverageRating}
            onChange={(e) => setContentCoverageRating(e.target.value)}
            className="form-control"
          >
            <option value="">Select rating...</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>

          <label htmlFor="interactionRating">Rating for Trainer's Teaching:</label>
          <select
            value={interactionRating}
            onChange={(e) => setInteractionRating(e.target.value)}
            className="form-control"
          >
            <option value="">Select rating...</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
          
          <label htmlFor="organizationRating">Rating for Trainer's Teaching:</label>
          <select
            value={organizationRating}
            onChange={(e) => setOrganizationRating(e.target.value)}
            className="form-control"
          >
            <option value="">Select rating...</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
          
          <label htmlFor="usefulnessRating">Rating for Trainer's Teaching:</label>
          <select
            value={interactionRating}
            onChange={(e) => setUsefulnessRating(e.target.value)}
            className="form-control"
          >
            <option value="">Select rating...</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
          <textarea
            value={feedbackMessage}
            onChange={(e) => setFeedbackMessage(e.target.value)}
            className="form-control"
            placeholder="Enter your feedback message..."
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackForm;
