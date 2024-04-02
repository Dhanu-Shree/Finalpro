const courseSchema = new mongoose.Schema({
    courseName: String,
    description: String,
    link: String,
    startDate: Date,
    endDate: Date
  });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;
