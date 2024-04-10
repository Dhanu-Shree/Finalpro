const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors'); // Import the cors package
require('dotenv').config();
const Intern = require('../server/server')
const app = express();
// Assuming you have defined the model as User_Details in index.js
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

const generateRandomDOB = () => {
    const start = new Date(1995, 0, 1); // January 1, 1995
    const end = new Date(2005, 11, 31); // December 31, 2005
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomIndianName = () => {
    // You can have an array of Indian names and randomly select from it
    const indianNames = ['Aarav', 'Aditi', 'Akash', 'Ananya', 'Arjun', 'Divya', 'Ishaan', 'Kavya', 'Krishna', 'Meera', 'Neha', 'Raj', 'Riya', 'Sahil', 'Sanya', 'Shreya', 'Varun', 'Vivek'];
    return indianNames[Math.floor(Math.random() * indianNames.length)];
};

const generateRandomState = () => {
    // Array of states outside India
    const statesOutsideIndia = ['Andhra Pradesh', 'Bihar', 'New York', 'TamilNadu', 'Kolkata', 'Maharastra', 'Kerala', 'UttraPradesh', 'Gujarat', 'Rajasthan'];
    return statesOutsideIndia[Math.floor(Math.random() * statesOutsideIndia.length)];
};

const seedUsers = async () => {
    try {
        const usersData = [];

        for (let i = 1; i <= 20; i++) {
            const userData = {
                name: generateRandomIndianName(),
                email: `intern_${i}@gmail.com`,
                password: 'jman@2024', // Hash the password
                dob: generateRandomDOB(),
                state: generateRandomState(), // Random state outside India
                country: 'India',
            };
            usersData.push(userData);
        }

        await Intern.insertMany(usersData); // Using the model directly
        console.log('Seed data added successfully');
    } catch (error) {
        console.error('Error seeding data: ', error);
    } 
};
seedUsers();
