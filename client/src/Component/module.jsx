import React, { useState } from 'react';
import axios from 'axios';
import './module.css';

function Module() {
  const [trainerName, setTrainerName] = useState('');
  const [trainerEmail, setTrainerEmail] = useState('');
  const [trainingName, setTrainingName] = useState('');
  const [trainingDate, setTrainingDate] = useState('');
  const [modules, setModules] = useState([]);

  const handleModuleChange = (index, event) => {
    const newModules = [...modules];
    newModules[index] = event.target.value;
    setModules(newModules);
  };

  const handleAddModule = () => {
    setModules([...modules, '']);                    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/trainings', {
        trainerName,
        trainerEmail,
        trainingName,
        trainingDate,
        modules
      });
      console.log('Form data sent successfully:', response.data);
      // Optionally, reset the form fields after successful submission
      setTrainerName('');
      setTrainerEmail('');
      setTrainingName('');
      setTrainingDate('');
      setModules([]);
    } catch (error) {
      console.error('Error sending form data:', error);
    }
  };
  return (
  <div className="Module">
  <h1>Training Assignment Form</h1>
  <form className='dum' onSubmit={handleSubmit}>
    <label>
      Trainer Name:
      <input type="text" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
    </label>
    <br />
    <label>
      Trainer Email:
      <input type="email" value={trainerEmail} onChange={(e) => setTrainerEmail(e.target.value)} />
    </label>
    <br />
    <label>
      Training Name:
      <input type="text" value={trainingName} onChange={(e) => setTrainingName(e.target.value)} />
    </label>
    <br />
    <label>
      Training Date:
      <input type="date" value={trainingDate} onChange={(e) => setTrainingDate(e.target.value)} />
    </label>
    <br />
    <label>
      Modules:
      {modules.map((module, index) => (
        <input
          key={index}
          type="text"
          value={module}
          onChange={(e) => handleModuleChange(index, e)}
        />
      ))}
      <button type="button" onClick={handleAddModule}>Add Module</button>
    </label>
    <br />
    <button type="submit">Assign Training</button>
  </form>
</div>
);
}

export default Module;