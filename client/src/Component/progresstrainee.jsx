import React, { useState, useEffect } from 'react';
import './Progress.css';
import TraineeNavbar from './Navfortrainee';

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

  // Group progress data by training name
  const groupedProgressData = {};
  progressData.forEach(progress => {
    if (!groupedProgressData[progress.trainingName]) {
      groupedProgressData[progress.trainingName] = [];
    }
    groupedProgressData[progress.trainingName].push(progress);
  });

  const filteredProgressData = Object.keys(groupedProgressData)
    .filter(trainingName => trainingName.toLowerCase().includes(searchTrainingName.toLowerCase()))
    .map(trainingName => groupedProgressData[trainingName]);

  return (
    <div>
      <TraineeNavbar />
      <h1>Progress</h1>
    

    <div className='progress-table-container'>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by TrainingName"
          value={searchTrainingName}
          onChange={(e) => setSearchTrainingName(e.target.value)} 
        />
      </div>
      <div className="progress-table-scrollable">
        {searchTrainingName ? (
          <div className="user-progress-table">
            <h2>Training Name: {searchTrainingName}</h2>
            <table className='progress-table'>
              <thead>
                <tr>
                  <th>UserId</th>
                  <th>User Name</th>
                  <th>Completed Modules</th>
                  <th>Progress</th>
                  <th>Assessment Scores</th>
                </tr>
              </thead>
              <tbody>
                {filteredProgressData.length > 0 ? (
                  filteredProgressData[0].map(progress => (
                    <tr key={progress._id}>
                      <td>{progress.userId}</td>
                      <td>{progress.username}</td>
                      <td>{progress.completedModules.length} modules completed</td>
                    
                      <td>{progress.progress}%</td>
                      <td>{generateAssessmentScore(progress.progress)}</td>
                   
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No progress data found for user ID: {searchTrainingName}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          Object.keys(groupedProgressData).map(trainingName => (
            <div key={trainingName} className="user-progress-table">
              <h3>TrainingName: {trainingName}</h3>
           
              <table className='progress-table'>
                <thead>
                  <tr>
                    <th>Intern_id</th>
                    <th>Intern Name</th>
                    <th>Completed Modules</th>
                    <th>Progress</th>
                    <th> AssessmentScores</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedProgressData[trainingName].map(progress => (
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
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default ProgressTable;
