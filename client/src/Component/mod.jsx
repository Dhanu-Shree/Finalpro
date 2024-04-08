import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function DividerWithCheckboxes({ modules, trainingName, sendProgressData }) {
  const [completedModules, setCompletedModules] = useState({});
  const [progressPercentage, setProgressPercentage] = useState(0);

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

  const handleCheckboxChange = (moduleName) => {
    const updatedCompletedModules = { ...completedModules, [moduleName]: !completedModules[moduleName] };
    setCompletedModules(updatedCompletedModules);

    const completedModuleCount = Object.values(updatedCompletedModules).filter(value => value).length;
    const newProgressPercentage = Math.round((completedModuleCount / modules.length) * 100);
    setProgressPercentage(newProgressPercentage);

    sendProgressData(trainingName, updatedCompletedModules, newProgressPercentage);
  };

  return (
    <div>
      {modules.map((module, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`module-${index}`}
            checked={completedModules[module] || false}
            onChange={() => handleCheckboxChange(module)}
          />
          <label htmlFor={`module-${index}`}>{module}</label>
        </div>
      ))}
    </div>
  );
}

DividerWithCheckboxes.propTypes = {
  modules: PropTypes.array.isRequired,
  trainingName: PropTypes.string.isRequired,
  sendProgressData: PropTypes.func.isRequired,
};

export default DividerWithCheckboxes;
