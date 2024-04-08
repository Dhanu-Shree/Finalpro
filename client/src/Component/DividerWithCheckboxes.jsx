import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Checkbox, LinearProgress } from '@mui/material';
import axios from 'axios';

function DividerWithCheckboxes({ modules ,trainingName}) {
  const [completedModules, setCompletedModules] = useState([]);

  const handleCheckboxToggle = (index,trainingName) => {
    console.log(trainingName)
    const currentIndex = completedModules.indexOf(index);
    const newCompletedModules = [...completedModules];

    if (currentIndex === -1) {
      newCompletedModules.push(index);
    } else {
      newCompletedModules.splice(currentIndex, 1);
    }

    setCompletedModules(newCompletedModules);

    // Calculate progress percentage
    const progressPercentage = Math.round((newCompletedModules.length / modules.length) * 100);

    // Send progress data to the backend
    sendProgressDataToBackend(trainingName, newCompletedModules, progressPercentage);
  };

  const sendProgressDataToBackend = async (trainingName, completedModules, progressPercentage) => {
    try {
      const userId = localStorage.getItem('userId');
      const username = localStorage.getItem('username');

      await axios.post('http://localhost:5000/user/progress', {
        userId,
        username,
        trainingName,
        completedModules,
        progress: progressPercentage
      });
      console.log('Progress data sent successfully',trainingName);
    } catch (error) {
      console.error('Error sending progress data:', error);
    }
  };

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
                onChange={() => handleCheckboxToggle(index,trainingName)}
              />
            </ListItem>
            {index < modules.length - 1 && <Divider component="li" />}
          </div>
        ))}
      </List>
      <LinearProgress className='MuiLinearProgress-root' variant="determinate" value={(completedModules.length / modules.length) * 100} />
      <p className="progress-percentage">Progress: {Math.round((completedModules.length / modules.length) * 100)}%</p>
    </div>
  );
}

export default DividerWithCheckboxes;
