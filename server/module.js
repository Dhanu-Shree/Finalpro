// app.js

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



// Training schema
const trainingSchema = new mongoose.Schema({
  trainerName: String,
  trainerEmail: String,
  trainingName: String,
  trainingDate: Date,
  modules: [String]
});

const Training = mongoose.model('Training', trainingSchema);

// Routes
app.post('/trainings', async (req, res) => {
  try {
    const { trainerName, trainerEmail, trainingName, trainingDate, modules } = req.body;
    const training = new Training({
      trainerName,
      trainerEmail,
      trainingName,
      trainingDate,
      modules
    });
    console.log(training)
    await training.save();
    console.log(training)
    res.send(training);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get('/trainings', async (req, res) => {
  try {
    const trainings = await Training.find();
    res.send(trainings);
    console.log(trainings)
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));