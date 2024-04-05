import React, { useState } from 'react';
import { List, ListItem, ListItemText, Divider, Checkbox, LinearProgress } from '@mui/material';

function DividerWithCheckboxes({ modules }) {
  const [completedModules, setCompletedModules] = useState([]);

  const handleCheckboxToggle = (index) => {
    const currentIndex = completedModules.indexOf(index);
    const newCompletedModules = [...completedModules];

    if (currentIndex === -1) {
      newCompletedModules.push(index);
    } else {
      newCompletedModules.splice(currentIndex, 1);
    }

    setCompletedModules(newCompletedModules);
  };

  const calculateProgress = () => {
    const progress = (completedModules.length / modules.length) * 100;
    return Math.round(progress); // Round progress to the nearest integer
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
                onChange={() => handleCheckboxToggle(index)}
              />
            </ListItem>
            {index < modules.length - 1 && <Divider component="li" />}
          </div>
        ))}
      </List>
      <LinearProgress className='MuiLinearProgress-root' variant="determinate" value={calculateProgress()} />
      <p className="progress-percentage">Progress: {calculateProgress()}%</p>{/* Display progress percentage */}
      
    </div>
  );
}

export default DividerWithCheckboxes;
