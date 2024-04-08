import React, { useState, useEffect } from 'react';
import './Progress.css';


function ProgressTable() {
  const [progressData, setProgressData] = useState([]);
  const userId = localStorage.getItem('userId');
  const username=localStorage.getItem('username')

  useEffect(() => {
    async function fetchProgressData() {
        try {
            const response = await fetch('http://localhost:5000/user/progress');
            const responseData = await response.json(); // Parse the response as JSON
            console.log(responseData); // Log the response data for debugging
        
            // Filter the progress data based on the userId
            const userProgressData = responseData.filter(progress => progress.userId === userId);
            
            // Update the state with the filtered progress data
            setProgressData(userProgressData);
            console.log(userProgressData);
          }catch (error) {
        console.error('Error fetching progress data:', error);
      }
    }

    if (userId) {
      fetchProgressData();
    }
  }, [userId]);

  return (
    <div className='progress-table-container'>
      <h1>Progress  {username}</h1>
      <br>
      </br><br>
      </br>
      <table className='progress-table'>
        <thead>
          <tr>
            <th>Training Name</th>
            <th>Completed Modules</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {progressData.map(progress => (
            <tr key={progress.username}>
              <td>{progress.trainingName}</td>
               <td> {progress.completedModules.length } modules completed</td> 
              <td>{progress.progress}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProgressTable;
