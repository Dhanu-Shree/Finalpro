import React, { useState, useEffect } from 'react';
import './Progress.css';

function ProgressTable() {
  const [progressData, setProgressData] = useState([]);
  const [searchUserId, setSearchUserId] = useState('');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

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

  const groupedProgressData = {};
  progressData.forEach(progress => {
    if (!groupedProgressData[progress.userId]) {
      groupedProgressData[progress.userId] = [];
    }
    groupedProgressData[progress.userId].push(progress);
  });

  const filteredProgressData = Object.keys(groupedProgressData)
    .filter(userId => userId.toLowerCase().includes(searchUserId.toLowerCase()))
    .map(userId => groupedProgressData[userId]);

  return (
    <div><h1> Progress</h1>
    <div className='progress-table-container'>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by User ID"
          value={searchUserId}
          onChange={e => setSearchUserId(e.target.value)}
        />
      </div>
      <div className="progress-table-scrollable">
        {searchUserId ? (
          <div className="user-progress-table">
            <h2>User ID: {searchUserId}</h2>
            <table className='progress-table'>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Training Name</th>
                  <th>Completed Modules</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {filteredProgressData.length > 0 ? (
                  filteredProgressData[0].map(progress => (
                    <tr key={progress._id}>
                      <td>{progress.username}</td>
                      <td>{progress.trainingName}</td>
                      <td>{progress.completedModules.length} modules completed</td>
                      <td>{progress.progress}%</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No progress data found for user ID: {searchUserId}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          Object.keys(groupedProgressData).map(userId => (
            <div key={userId} className="user-progress-table">
              <h3>User ID: {userId}</h3>
              <h3>Username: {groupedProgressData[userId][0].username}</h3>
              <table className='progress-table'>
                <thead>
                  <tr>
                    <th>Training Name</th>
                    <th>Completed Modules</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  {groupedProgressData[userId].map(progress => (
                    <tr key={progress._id}>
                      <td>{progress.trainingName}</td>
                      <td>{progress.completedModules.length} modules completed</td>
                      <td>{progress.progress}%</td>
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
