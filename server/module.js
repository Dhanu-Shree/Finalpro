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

 
// MongoDB connection
const PORT = process.env.PORT || 5000;
const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));



// Training schema
const trainingSchema = new mongoose.Schema({
  trainerName: String,
  trainerEmail: String,
  trainingName: String,

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
    console.log("trainings",trainings)
    res.send(trainings);
    console.log(trainings)
  } catch (error) {
    res.status(500).send(error);
  }
});
const progressSchema = new mongoose.Schema({
  userId: String,
  username: String,
  trainingName: String,
  progressPercentage: Number,
});

// Create a model based on the schema
const Progress = mongoose.model('Progress', progressSchema);

app.use(bodyParser.json());

// Endpoint to store user progress
app.post('/user/progress', async (req, res) => {
  try {
    const { userId, username, trainingName, progressPercentage } = req.body;

    // Check if user progress already exists, if so update it, otherwise create a new entry
    const existingProgress = await Progress.findOne({ userId, trainingName });
    if (existingProgress) {
      existingProgress.progressPercentage = progressPercentage;
      await existingProgress.save();
    } else {
      const progress = new Progress({
        userId,
        username,
        trainingName,
        progressPercentage,
      });
      await progress.save();
    }

    res.status(200).json({ message: 'Progress stored successfully' });
  } catch (error) {
    console.error('Error storing progress:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));