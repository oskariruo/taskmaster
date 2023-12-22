// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new task
router.post('/', async (req, res) => {
  const { text, date } = req.body;

  const task = new Task({ text, date });

  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Update a task's completion status by ID
router.patch('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;
  const { completed } = req.body;

try {
  const updateTask = await Task.findByIdAndUpdate(
    taskId,
    { completed },
    {new: true}
  );

  if (!updatedTask) {
    return res.status(404).json({ error: 'Task not found' });
  }

  res.json(updatedTask);
} catch(error) {
  console.error(error);
  res.status(500).json({ error: 'Internal Server Error' });
}
})

// Delete a task by ID
router.delete('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const deletedTask = await Task.findOneAndDelete({ _id: taskId });

    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;