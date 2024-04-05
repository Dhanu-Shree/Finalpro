
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
 
// Middleware
app.use(express.json());
app.use(cors({
    origin: '*', // Allow requests only from this origin
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
  }));
const PORT = process.env.PORT || 5000;
 
// MongoDB connection
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

 

// Define schemas for intern, employee, and trainee
const InternSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  dob: Date,
  state: String,
  country: String
});

const EmployeeSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  experience: String,
  department: String,
  dob: Date,
  state: String,
  country: String
});

const TraineeSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  experience: String,
  department: String,
  dob: Date,
  state: String,
  country: String
});

// Define models for intern, employee, and trainee
const Intern = mongoose.model('Intern', InternSchema);
const Employee = mongoose.model('Employee', EmployeeSchema);
const Trainee = mongoose.model('Trainee', TraineeSchema);

// Route to handle intern form submission
app.post('/api/intern', async (req, res) => {
  try {
    const internData = req.body;
    const intern = new Intern(internData);
    await intern.save();
    res.status(201).send(intern);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to handle employee form submission
app.post('/api/employee', async (req, res) => {
  try {
    const employeeData = req.body;
    const employee = new Employee(employeeData);
    await employee.save();
    res.status(201).send(employee);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Route to handle trainee form submission
app.post('/api/trainee', async (req, res) => {
  try {
    const traineeData = req.body;
    const trainee = new Trainee(traineeData);
    await trainee.save();
    res.status(201).send(trainee);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
