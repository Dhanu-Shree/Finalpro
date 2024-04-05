import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import './newuser.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const departments = [
  'Fullstack',
  'Data Engineering',
  'Data Science',
  'Testing',
  'Machine Learning',
];

const designations = {
  intern: 'Intern',
  trainer: 'Trainer',
  employee: 'Employee',
};

function BasicModal() {
  const [open, setOpen] = useState(false);
  const [designation, setDesignation] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    experience: '',
    department: '',
    dob: '',
    state: '',
    country: '',
  });

  const handleOpen = (designation) => {
    setOpen(true);
    setDesignation(designation);
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/${designation}`, formData);
      console.log(res.data);
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="center">
      <div className="cardsss">
        <Button onClick={() => handleOpen('intern')}>Open Intern form</Button>
      </div>
      <div className="cardsss">
        <Button onClick={() => handleOpen('employee')}>Open Employee form</Button>
      </div>
      <div className="cardsss">
        <Button onClick={() => handleOpen('trainee')}>Open Trainee form</Button>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {designations[designation]} Form
          </Typography>
          <form className="modal-form" onSubmit={handleSubmit}>
            <TextField name="id" label="ID" fullWidth className="modal-field" InputProps={{ classes: { root: 'custom-textfield' } }} onChange={handleChange} />
            <TextField name="name" label="Name" fullWidth className="modal-field" InputProps={{ classes: { root: 'custom-textfield' } }} onChange={handleChange} />
            <TextField name="email" label="Email" fullWidth className="modal-field" InputProps={{ classes: { root: 'custom-textfield' } }} onChange={handleChange} />
            <TextField name="password" label="Password" type="password" fullWidth className="modal-field" InputProps={{ classes: { root: 'custom-textfield' } }} onChange={handleChange} />
            {(designation === 'trainee' || designation === 'employee') && (
              <TextField name="experience" label="Experience" fullWidth className="modal-field" InputProps={{ classes: { root: 'custom-textfield' } }} onChange={handleChange} />
            )}
            {(designation !== 'intern') && (
              <TextField
                select
                name="department"
                label="Department"
                fullWidth
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="modal-field"
                InputProps={{ classes: { root: 'custom-textfield' } }}
              >
                {departments.map((department) => (
                  <MenuItem key={department} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </TextField>
            )}
            <TextField name="dob" label="DOB" type="date" fullWidth className="modal-field" InputProps={{ classes: { root: 'custom-textfield' } }} InputLabelProps={{ shrink: true }} onChange={handleChange} />
            <TextField name="state" label="State" fullWidth className="modal-field" InputProps={{ classes: { root: 'custom-textfield' } }} onChange={handleChange} />
            <TextField name="country" label="Country" fullWidth className="modal-field" InputProps={{ classes: { root: 'custom-textfield' } }} onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary" className="modal-button">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
