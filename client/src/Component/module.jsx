import React, { useState } from 'react';
import './module.css'; // Import CSS file for styling

function TrainingForm() {
  const [trainerName, setTrainerName] = useState('');
  const [trainerEmail, setTrainerEmail] = useState('');
  const [trainingName, setTrainingName] = useState('');
  const [modules, setModules] = useState([{ link: '' }]);

  const handleAddModule = () => {
    setModules([...modules, { link: '' }]);
  };

  const handleModuleChange = (index, value) => {
    const updatedModules = [...modules];
    updatedModules[index].link = value;
    setModules(updatedModules);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to backend or perform further processing
    console.log({
      trainerName,
      trainerEmail,
      trainingName,
      modules
    });
    // Clear form fields after submission if needed
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2>Training Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="trainerName" className="form-label">Trainer Name</label>
            <input type="text" className="form-control" id="trainerName" value={trainerName} onChange={(e) => setTrainerName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="trainerEmail" className="form-label">Trainer Email</label>
            <input type="email" className="form-control" id="trainerEmail" value={trainerEmail} onChange={(e) => setTrainerEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="trainingName" className="form-label">Training Name</label>
            <input type="text" className="form-control" id="trainingName" value={trainingName} onChange={(e) => setTrainingName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Modules</label>
            {modules.map((module, index) => (
              <div key={index} className="d-flex">
                <input type="text" className="form-control me-2" placeholder="Module Link" value={module.link} onChange={(e) => handleModuleChange(index, e.target.value)} />
                {index === modules.length - 1 && (
                  <button type="button" className="btn btn-primary" onClick={handleAddModule}>Add Module</button>
                )}
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default TrainingForm;
