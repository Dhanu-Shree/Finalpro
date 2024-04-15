import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Divider, Checkbox, LinearProgress } from '@mui/material';
import axios from 'axios';

function DividerWithCheckboxes({ modules, trainingName }) {
  const [completedModules, setCompletedModules] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProgressData() {
      try {
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('userName');

        // Fetch all progress data
        const response = await axios.get('http://localhost:5000/user/progress');
        const progressData = response.data;

        // Find progress data for the current user and trainingName
        const userProgress = progressData.find(progress => progress.userId === userId && progress.username === username && progress.trainingName === trainingName);

        if (userProgress) {
          // Set completed modules and progress percentage
          setCompletedModules(userProgress.completedModules.map(module => parseInt(module)));
          setProgressPercentage(userProgress.progress);
        }
      } catch (error) {
        console.error('Error fetching progress data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProgressData();
  }, [trainingName]);

  const handleCheckboxToggle = async (index) => {
    const currentIndex = completedModules.indexOf(index);
    const newCompletedModules = [...completedModules];

    if (currentIndex === -1) {
      newCompletedModules.push(index);
    } else {
      newCompletedModules.splice(currentIndex, 1);
    }

    setCompletedModules(newCompletedModules);

    // Calculate progress percentage
    const newProgressPercentage = Math.round((newCompletedModules.length / modules.length) * 100);
    setProgressPercentage(newProgressPercentage);

    // Send progress data to the backend
    sendProgressDataToBackend(trainingName, newCompletedModules, newProgressPercentage);
  };

  const sendProgressDataToBackend = async (trainingName, completedModules, progressPercentage) => {
    try {
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('userName');

      await axios.post('http://localhost:5000/user/progress', {
        userId,
        username,
        trainingName,
        completedModules,
        progress: progressPercentage
      });
      console.log('Progress data sent successfully', trainingName);
    } catch (error) {
      console.error('Error sending progress data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="divider-with-checkboxes">
      <h3>Modules:</h3>
      <List>
        {modules.map((module, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText primary={module} />
              <Checkbox
                checked={completedModules.includes(index)}
                onChange={() => handleCheckboxToggle(index)}
              />
            </ListItem>
            {index < modules.length - 1 && <Divider component="li" />}
          </div>
        ))}
      </List>
      <LinearProgress className='MuiLinearProgress-root' variant="determinate" value={progressPercentage} />
      <p className="progress-percentage">Progress: {progressPercentage}%</p>
    </div>
  );
}

export default DividerWithCheckboxes;
