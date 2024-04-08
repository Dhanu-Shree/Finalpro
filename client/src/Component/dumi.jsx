import React, { useState, useEffect } from 'react';
import './Progress.css';

function ProgressTable() {
  const [progressData, setProgressData] = useState([]);
  const [searchTrainingName, setSearchTrainingName] = useState('');
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

        setProgressData(responseData);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    }

    fetchProgressData();
  }, []);

  // Get unique training names
  const uniqueTrainingNames = [...new Set(progressData.map(progress => progress.trainingName))];

  return (
    <div>
      <h1>Progress</h1>
      <div className='progress-table-container'>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Training Name"
            value={searchTrainingName}
            onChange={e => setSearchTrainingName(e.target.value)}
          />
        </div>
        {uniqueTrainingNames.map(trainingName => (
          <div key={trainingName} className="user-progress-table">
            <h2>Training Name: {trainingName}</h2>
            <table className='progress-table'>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Username</th>
                  <th>Completed Modules</th>
                  <th>Progress</th>
                  <th>Assessment Scores</th>
                </tr>
              </thead>
              <tbody>
                {progressData
                  .filter(progress => progress.trainingName === trainingName && progress.trainingName.toLowerCase().includes(searchTrainingName.toLowerCase()))
                  .map(progress => (
                    <tr key={progress._id}>
                      <td>{progress.userId}</td>
                      <td>{progress.username}</td>
                      <td>{progress.completedModules.length} modules completed</td>
                      <td>{progress.progress}%</td>
                      <td>{generateAssessmentScore(progress.progress)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressTable;
