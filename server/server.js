const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const bcrypt = require('bcrypt');
const router = express.Router();
const nodemailer = require("nodemailer");
const sendEmail = require('./mailer')
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
    userid:{type:String,required:true},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    state:{type:String,required:true},
    role:{type:String,required:true},
    dob:{type:Date,required:true}
})

const User=new mongoose.model("userdetail",UserSchema)

 
// Middleware
app.use(express.json());
 
// Route to handle user creation

// Route to create a new user
app.post('/usercreate', async (req, res) => {
  try {
    const { userid, username, role ,email,password,  dob, state } = req.body;
    const user = new User({ userid, username, email , password, state, role, dob });
    await user.save();

  } catch (err) {
    console.error('Error creating user:', err);
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
  
  const Course = mongoose.model('Courses', courseSchema);

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
  startTime: String,
  endTime: String,
  dates: Date, // Store assessment dates as an array of Date objects
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
const Intern = mongoose.model('Interns', InternSchema);
const Employee = mongoose.model('Employee', EmployeeSchema);
const Trainee = mongoose.model('Trainees', TraineeSchema);

// Route to handle intern form submission
app.post('/api/intern', async (req, res) => {
  try {
    const internData = req.body;
    const intern = new Intern(internData);
    await intern.save();
    
    res.status(201).send(intern);
console.log('jolly')
    
  const text = `
    Welcome!
    Your account has been created with the default userid: ${internData.id} and username:${internData.name}
    Please login to our website using this password
  `;
  const subject='Welcome to Newwave Training'
  
  sendEmail(internData.email,subject,text);
}
  
  catch (error) {
    res.status(400).send(error);
  }
});

// Route to handle fetching all intern data
app.get('/api/intern', async (req, res) => {
  try {
    // Find all interns in the database
    const interns = await Intern.find();
    
    // Send the array of intern data as response
    res.send(interns);
    console.log(interns);
    console.log('fetched',interns);
    
  } catch (error) {
    // If an error occurs, send 500 Internal Server Error status
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Route to handle employee form submission
app.post('/api/employee', async (req, res) => {
  try {
    const employeeData = req.body;
    const employee = new Employee(employeeData);
    await employee.save();
    res.status(201).send(employee);
    const text = `
    Welcome!
    Your account has been created with the default userid: ${employeeData.id} and username:${employeeData.name}
    Please login to our website using this password
  `;
  const subject='Welcome to Newwave Training'
  
  sendEmail(employeeData.email,subject,text);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/employee', async (req, res) => {
  try {
    // Find all interns in the database
    const employees = await Employee.find();
    
    // Send the array of intern data as response
    res.send(employees);
    console.log(employees);
    console.log('fetched',employees);
  } catch (error) {
    // If an error occurs, send 500 Internal Server Error status
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Route to handle trainee form submission
app.post('/api/trainee', async (req, res) => {
  try {
    const traineeData = req.body;
    const trainee = new Trainee(traineeData);
    await trainee.save();
    res.status(201).send(trainee);
    const text = `
    Welcome!
    Your account has been created with the default userid: ${traineeData.id} and username:${traineeData.name}
    Please login to our website using this password
  `;
  const subject='Welcome to Newwave Training'
  
  sendEmail(traineeData.email,subject,text);
  } catch (error) {
    res.status(400).send(error);
  }
});


app.get('/api/trainee', async (req, res) => {
  try {
    // Find all trainees in the database
    const trainees = await Trainee.find();
    
    // Send the array of trainee data as response
    res.send(trainees);
    console.log('trainee',trainees)
  } catch (error) {
    // If an error occurs, send 500 Internal Server Error status
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Training schema
const trainingSchema = new mongoose.Schema({
  trainerName: String,
  trainerEmail: String,
  trainingName: String,
  trainingstartDate: Date,
  trainingendDate:Date,
  modules: [String]
});

const Training = mongoose.model('Training', trainingSchema);

// Routes
app.post('/trainings', async (req, res) => {
  try {
    const { trainerName, trainerEmail, trainingName, trainingstartDate,trainingendDate, modules } = req.body;
    const training = new Training({
      trainerName,
      trainerEmail,
      trainingName,
      trainingstartDate,
      trainingendDate,
      modules
    });
    console.log('hi')
    await training.save();

   const text=` Welcome!
    Your calendars are blocked for the training program for interns.. You has been
    allocated for ${training.trainingName} from ${training.trainingstartDate} to ${training.trainingendDate} !!`;
  const subject='Welcome to Newwave Training'


  sendEmail(training.trainerEmail,subject,text);
} catch (error) {
  res.status(400).send(error);
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
const emptSchema = new mongoose.Schema({
  Training: String,
  Trainer: String,
  studymaterial: String,
  startDate: Date,
  endDate: Date
});

const Emptrain = mongoose.model('employetrain', emptSchema);

// Route to add a new course
app.post('/employeetraining', async (req, res) => {
try {
  const { Training, Trainer, studymaterial, startDate, endDate } = req.body;
  const newCourse = new Emptrain({
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
app.get('/employeetraining', async (req, res) => {
try {
  console.log("came")
  const courses = await Emptrain.find();
  res.json(courses);
  console.log(courses);
} catch (error) {
  console.error('Error fetching courses:', error);
  res.status(500).send('Error fetching courses');
}
});

const progressSchema = new mongoose.Schema({
  userId: String,
  username: String,
  trainingName: String,
  completedModules: [String],
  progress: Number
});


const Progress = mongoose.model('Progress', progressSchema);





// app.post('/user/progress', async (req, res) => {
//   try {
//     const { userId, username, trainingName, completedModules, progress } = req.body;
 
//     const newProgress = new Progress({
//       userId,
//       username,
//       trainingName,
//       completedModules,
//       progress
//     });

//     await newProgress.save();
//     res.status(201).send('Progress data saved successfully');
//   } catch (error) {
//     console.error('Error saving progress data:', error);
//     res.status(500).send('Internal server error');
//   }
// });
// Route to fetch progress data for a specific userId

app.post('/user/progress', async (req, res) => {
  try {
    const { userId, username, trainingName, completedModules, progress } = req.body;

    // Check if a progress document already exists for the given userId and trainingName
    let existingProgress = await Progress.findOne({ userId, trainingName });

    if (existingProgress) {
      // Update existing progress document with new completedModules and progress
      existingProgress.completedModules = completedModules;
      existingProgress.progress = progress;

      // Save the updated progress document
      await existingProgress.save();
      res.status(200).send('Progress data updated successfully');
    } else {
      // Create a new progress document
      const newProgress = new Progress({
        userId,
        username,
        trainingName,
        completedModules,
        progress
      });

      // Save the progress data to the database
      await newProgress.save();
      res.status(201).send('Progress data saved successfully');
    }
  } catch (error) {
    console.error('Error saving/updating progress data:', error);
    res.status(500).send('Internal server error');
  }
});

app.get('/user/progress', async (req, res) => {
  try {
   
 console.log('datas of progress')
    const progressData = await Progress.find();
    res.json(progressData);
    console.log('Progress : ', progressData)
  } catch (error) {
    console.error('Error fetching progress data:', error);
    res.status(500).send('Internal server error');
  }
});

// Assuming you have already set up Express and configured routes

const feedbackSchema = new mongoose.Schema({
  trainerId:String,
  userId:String,
  userName:String,
  trainerName: String,
  overallRating: Number,
  contentCoverageRating: Number,
  interactionRating: Number,
  organizationRating: Number,
  usefulnessRating: Number,
  feedbackMessage: String,
});

// Create a model based on the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Routes
app.post('/feedback', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start server

module.exports=Intern;
