const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let course = {
  studymaterial: 'Training Materials',
  modules: [
    { title: 'Module 1', completed: false },
    { title: 'Module 2', completed: false },
    { title: 'Module 3', completed: false },
    { title: 'Module 4', completed: false },
    { title: 'Module 5', completed: false }
  ],
  progress: 0
};

app.get('/course', (req, res) => {
  res.json(course);
});

app.put('/course/modules/:moduleId', (req, res) => {
  const { moduleId } = req.params;
  course.modules[moduleId].completed = true;
  const completedModulesCount = course.modules.filter(module => module.completed).length;
  course.progress = (completedModulesCount / course.modules.length) * 100;
  res.send('Module marked as completed');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
