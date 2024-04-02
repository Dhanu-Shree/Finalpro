const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const bcrypt = require('bcrypt');
 
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
 
// User model

const UserSchema=new mongoose.Schema({
    userid:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const User=new mongoose.model("User",UserSchema)

 
// Middleware
app.use(express.json());
 
// Route to handle user creation
app.post('/usercreate', async (req, res) => {
    try {
  const { userid,username,email,password} = req.body;
      const user = new User({userid,username,email,password });
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  const courseSchema = new mongoose.Schema({
    courseName: String,
    description: String,
    link: String,
    startDate: Date,
    endDate: Date
  });
  
  const Course = mongoose.model('Course', courseSchema);

  // Route to add a new course
app.post('/api/courses', async (req, res) => {
  try {
    const { courseName, description, link, startDate, endDate } = req.body;
    const newCourse = new Course({
      courseName,
      description,
      link,
      startDate,
      endDate
    });
    await newCourse.save();
    res.status(201).send('Course added successfully')
  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).send('Error adding course');
  }
});



const assessSchema = new mongoose.Schema({
  assessmentName: String,
  links: String,
  startTime: Date,
  endTime: Date,
  Duration:Date
});

const Assessment = mongoose.model('Assessment', assessSchema);

// Route to add a new course
app.post('/assessment', async (req, res) => {
try {
  const { assessmentName, links, startTime, endTime,Duartion } = req.body;
  const newAssessment = new Assessment({
    assessmentName,
    links,
    startTime,
    endTime,
    Duartion
  });
  await newAssessment.save();
  res.status(201).send('Assessment added successfully')
} catch (error) {
  console.error('Error adding course:', error);
  res.status(500).send('Error adding course');
}
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
