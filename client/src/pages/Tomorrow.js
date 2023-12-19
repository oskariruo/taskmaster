import React from "react";
import TaskList from '../components/TaskList';
import TaskForm from "--/components/TaskForm";
import Nav from '../components/Nav';

export default function Tomorrow({tasks, addTask, completeTask }){
    return (
        <div>
            <Nav />
            <h2>Tomorrow's tasks</h2>
            <TaskList tasks={tasks} onComplete={completeTask} />
            <TaskForm addTask={addTask} />
        </div>
    )
}