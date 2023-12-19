const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;

mongoose.connect('mongodb://localhost/taskmaster', { useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const taskSchema = new mongoose.Schema({
    text: String,
    status: String,
});

const Task = mongoose.model('Task', taskSchema);

app.use(express.json());

app.get('/tasks', async (req, res) => {
    try{
    const tasks = await Tasks.find();
    res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

app.post('/tasks', async (req, res) => {
    const { text, status } = req.body;
    const task = new Task({ text, status });

    try {
        const savedTasks = await task.save();
        res.json(savedTasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error '});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});