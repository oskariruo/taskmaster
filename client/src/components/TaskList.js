import React from "react";
import { List } from "@mui/material";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onDelete, onCheckToggle}) {
  return (
    <List>
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onDelete={onDelete}
          onCheckToggle={onCheckToggle}
        />
      ))}
    </List>
  );
}