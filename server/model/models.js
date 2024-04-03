// models.js
const mongoose = require('mongoose');

// User model
const userSchema = new mongoose.Schema({
    userid: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);

// Course model
const courseSchema = new mongoose.Schema({
    courseName: String,
    description: String,
    link: String,
    startDate: Date,
    endDate: Date
});

const Course = mongoose.model('Course', courseSchema);

// Assessment model
const assessSchema = new mongoose.Schema({
    assessmentName: String,
    links: String,
    startTime: Date,
    endTime: Date,
    dates: Date
});

const Assessment = mongoose.model('Assessment', assessSchema);

module.exports = { User, Course, Assessment };
