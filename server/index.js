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
    role:{type:String,required:true},
    password:{type:String,required:true}
    
})


const User=mongoose.model("logindetails",UserSchema);

 
// Middleware
app.use(express.json());
 
// Route to handle user creation
app.post('/login', async (req, res) => {
    try {
  const { userid,username,role,password} = req.body;
  console.log(req.body);
      const user = new User({userid,username,role,password });
      console.log(user);
      await user.save();
      console.log('user saved');
      res.status(201).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  });
  app.get('/login', async (req, res) => {
    try {
      const login = await User.find();
      res.json(login);
      console.log('getted ',login)
    } catch (error) {
      console.error('Error fetching login:', error);
      res.status(500).send('Error fetching login');
    }
  });
// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
