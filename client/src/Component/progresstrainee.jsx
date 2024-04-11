import React, { useState, useEffect } from 'react';
import './Progress.css';
import TraineeNavbar from './Navfortrainee';

function ProgressTable() {
  const [progressData, setProgressData] = useState([]);
  const [searchTrainingName, setSearchTrainingName] = useState('');

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

  // Filter training names based on searchTrainingName
  const filteredTrainingNames = Object.keys(groupedProgressData).filter(name =>
    name.toLowerCase().includes(searchTrainingName.toLowerCase())
  );

  return (
    <div>
      <TraineeNavbar />
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
        <div className="progress-table-scrollable">
          {filteredTrainingNames.map(trainingName => (
            <div key={trainingName} className="training-progress-table">
              <h2>Training Name: {trainingName}</h2>
              <table className='progress-table'>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Modules Completed</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedProgressData[trainingName].map(progress => (
                    <tr key={progress._id}>
                      <td>{progress.userId}</td>
                      <td>{progress.username}</td>
                      <td>{progress.completedModules.length}</td>
                      <td>{progress.progress}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProgressTable;
