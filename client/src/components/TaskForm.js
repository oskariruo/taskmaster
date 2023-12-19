import React, { useState } from 'react';

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
        <div>
            <input
                type='text'
                placeholder='Add a new task...'
                value={newTask}
                onChange={handleInputChange}
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
};