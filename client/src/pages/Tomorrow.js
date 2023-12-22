import React from "react";
import TaskList from '../components/TaskList';
import TaskForm from "../components/TaskForm";
import Nav from '../components/Nav';

export default function Tomorrow({ tasks, addTask, deleteTask, handleCheckboxChange }){
    return (
        <div>
            <Nav />
            <h2>Tomorrow's tasks</h2>
            <TaskList 
                tasks={tasks} 
                onDelete={deleteTask}
                onCheckToggle={handleCheckboxChange}/>
            <TaskForm 
                addTask={addTask} 
            />
        </div>
    )
}