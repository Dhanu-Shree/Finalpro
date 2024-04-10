import React, { useState, useEffect } from 'react';
import './Progress.css';

function ProgressTable() {
  const [progressData, setProgressData] = useState([]);
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('userName');
  console.log('name',username)

  // Define the generateAssessmentScore function
  const generateAssessmentScore = (progress) => {
    if (progress < 50) {
      return Math.floor(Math.random() * 50);
    } else {
      return Math.floor(Math.random() * 50) + 50;
    }
  };

  useEffect(() => {
    async function fetchProgressData() {
      try {
        const response = await fetch('http://localhost:5000/user/progress');
        const responseData = await response.json();
        console.log(responseData);

        const userProgressData = responseData.filter(progress => progress.userId === userId);
        setProgressData(userProgressData);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    }

    if (userId) {
      fetchProgressData();
    }
  }, [userId]);

  return (
    <div className='progress-table-container'>
      <h1>Progress {username}</h1>
      <br />
      <br />
      <table className='progress-table'>
        <thead>
          <tr>
            <th>Training Name</th>
            <th>Completed Modules</th>
            <th>Progress</th>
            <th>Assessment Scores</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map(progress => (
            <tr key={progress.username}>
              <td>{progress.trainingName}</td>
              <td>{progress.completedModules.length} modules completed</td>
              <td>{progress.progress}%</td>
              <td>{generateAssessmentScore(progress.progress)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProgressTable;
