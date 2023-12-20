import React, { useState } from 'react';
import { Button, Input, Box } from "@mui/material";

export default function TaskForm( { addTask }){
    const [newTask, setNewTask] = useState('');

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    const handleAddTask = () => {
        if (newTask.trim() !== '') {
            addTask(newTask);
            setNewTask('')
        }
    };

    return (
        <Box>
            <Input
                type='text'
                placeholder='Add a new task...'
                value={newTask}
                onChange={handleInputChange}
            />
            <Button onClick={handleAddTask}>Add Task</Button>
        </Box>
    );
};