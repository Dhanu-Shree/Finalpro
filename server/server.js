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
    password:{type:String,required:true},
    state:{type:String,required:true},
    role:{type:String,required:true},
    dob:{type:Date,required:true}
})

const User=new mongoose.model("User",UserSchema)

 
// Middleware
app.use(express.json());
 
// Route to handle user creation
app.post('/usercreate', async (req, res) => {
    try {
  const { userid,username,email,role,dob,state,password} = req.body;
      const user = new User({userid,username,role,dob,state,email,password });
      console.log(user)
      await user.save();
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });

  const courseSchema = new mongoose.Schema({
    Training: String,
    Trainer: String,
    studymaterial: String,
    startDate: Date,
    endDate: Date
  });
  
  const Course = mongoose.model('Course', courseSchema);

  // Route to add a new course
app.post('/api/courses', async (req, res) => {
  try {
    const { Training, Trainer, studymaterial, startDate, endDate } = req.body;
    const newCourse = new Course({
      Training,
      Trainer,
      studymaterial,
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
app.get('/api/courses', async (req, res) => {
  try {
    console.log("came")
    const courses = await Course.find();
    res.json(courses);
    console.log(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).send('Error fetching courses');
  }
});


const assessSchema = new mongoose.Schema({
  assessmentName: String,
  links: String,
  startTime: Date,
  endTime: Date,
  dates: [Date], // Store assessment dates as an array of Date objects
});

const Assessment = mongoose.model('Assessment', assessSchema);

// Route to add a new assessment
app.post('/assessment', async (req, res) => {
  try {
    const { assessmentName, links, startTime, endTime, dates } = req.body;
    const newAssessment = new Assessment({
      assessmentName,
      links,
      startTime,
      endTime,
      dates,
    });

    await newAssessment.save();
    res.status(201).send('Assessment added successfully');
  } catch (error) {
    console.error('Error adding assessment:', error);
    res.status(500).send('Error adding assessment');
  }
});

// Route to fetch assessment dates
app.get('/assessment', async (req, res) => {
  try {
    const assessments = await Assessment.find();
    res.json(assessments);
    console.log(assessments)
  } catch (error) {
    console.error('Error fetching assessment:', error);
    res.status(500).send('Error fetching assessment');
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

